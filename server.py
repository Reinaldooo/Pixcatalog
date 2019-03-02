from flask import Flask, render_template, request, redirect, jsonify
from flask import url_for, send_file, json, make_response, abort
from flask import session as login_session
from PIL import Image as ImageEdit
from sqlalchemy import create_engine, asc, func, desc
from sqlalchemy.orm import sessionmaker
from database_setup import Category, Base, Image, User, engine
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
from operator import itemgetter
from werkzeug.utils import secure_filename
import random
import string
import httplib2
import json
import os
import requests

app = Flask(__name__, static_folder='./frontend/build/static',
            template_folder='./frontend/build')

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

CLIENT_ID = json.loads(
    open('secret.json', 'r').read())['web']['client_id']
APPLICATION_NAME = "PixCatalog"

# Connect to Database and create database session
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


def createUser(login_session):
    newUser = User(name=login_session['username'], email=login_session[
                   'email'], picture=login_session['picture'])
    session.add(newUser)
    session.commit()
    user = session.query(User).filter_by(email=login_session['email']).one()
    return user.id


def getUserInfo(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    return user


def getUserIDByEmail(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user.id
    except Exception:
        return None


def getUserIDByName(user):
    try:
        user = session.query(User).filter_by(name=user).one()
        return user.id
    except Exception:
        return None


def createCategory(title):
    newCategory = Category(title=title)
    session.add(newCategory)
    session.commit()
    category = session.query(Category).filter_by(title=title).one()
    return category.id


def getCategoryID(title):
    try:
        category = session.query(Category).filter_by(title=title).one()
        return category.id
    except Exception:
        return None


@app.route('/', defaults={'path': ''}, methods=["GET", "DELETE"])
@app.route('/<path:path>')
def index(path):
    if request.method == "DELETE":
        print(request)
    return render_template('index.html')


""" Credentials-related routes """


@app.route('/api/get_token')
def get_token():
    state = ''.join(
        random.choice(string.ascii_uppercase + string.digits) for x in range(32))
    login_session['serverToken'] = state
    # return "The current session state is %s" % login_session['state']
    return state


@app.route('/api/check_credentials')
def check_credentials():
    if 'username' in login_session:
        return jsonify(
                      username=login_session['username'],
                      email=login_session['email'],
                      user_id=login_session['user_id']
                      )
    else:
        return jsonify(error="Not logged in")


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
        try:
            user = session.query(User).filter_by(name=username).one()
        except Exception:
            return jsonify(status=False)
        ok = user.verify_password(password)
        if ok:
            login_session['username'] = user.name
            login_session['picture'] = user.picture
            login_session['email'] = user.email
            login_session['user_id'] = user.id
            return jsonify(
                          status="Ok",
                          username=user.name,
                          email=user.email,
                          user_id=user.id
                          )
        return jsonify(status=False)


@app.route('/gconnect', methods=['POST'])
def gconnect():
    requestData = json.loads(request.data)
    # Validate state token
    if requestData['serverToken'] != login_session['serverToken']:
        response = make_response(json.dumps('Invalid state parameter.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    # Obtain authorization code, now compatible with Python3
    code = requestData['code']

    try:
        # Upgrade the authorization code into a credentials object
        oauth_flow = flow_from_clientsecrets('secret.json', scope='')
        oauth_flow.redirect_uri = 'postmessage'
        credentials = oauth_flow.step2_exchange(code)
    except FlowExchangeError:
        response = make_response(
            json.dumps('Failed to upgrade the authorization code.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check that the access token is valid.
    access_token = credentials.access_token
    url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s'
           % access_token)
    # Submit request, parse response - Python3 compatible
    h = httplib2.Http()
    response = h.request(url, 'GET')[1]
    str_response = response.decode('utf-8')
    result = json.loads(str_response)

    # If there was an error in the access token info, abort.
    if result.get('error') is not None:
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = make_response(
            json.dumps("Token's user ID doesn't match given user ID."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is valid for this app.
    if result['issued_to'] != CLIENT_ID:
        response = make_response(
            json.dumps("Token's client ID does not match app's."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    stored_access_token = login_session.get('access_token')
    stored_gplus_id = login_session.get('gplus_id')
    if stored_access_token is not None and gplus_id == stored_gplus_id:
        response = make_response(
                                 json.dumps('Current user is already connected.'),
                                 200
                                 )
        response.headers['Content-Type'] = 'application/json'
        return response

    # Store the access token in the session for later use.
    login_session['access_token'] = access_token
    login_session['gplus_id'] = gplus_id

    # Get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)

    data = answer.json()

    login_session['username'] = data['name']
    login_session['picture'] = data['picture']
    login_session['email'] = data['email']

    user_id = getUserIDByEmail(login_session['email'])
    if not user_id:
        user_id = createUser(login_session)
    login_session['user_id'] = user_id

    return jsonify(
                  status="Ok",
                  username=login_session['username'],
                  email=login_session['email'],
                  user_id=login_session['user_id']
                  )


@app.route('/logout')
def logout():
    # Only disconnect a connected user.
    access_token = login_session.get('access_token')
    username = login_session.get('username')
    gplus_id = login_session.get('gplus_id')
    if access_token is None and username is None:
        response = make_response(
            json.dumps('Current user not connected.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    if gplus_id is not None:
        url = 'https://accounts.google.com/o/oauth2/revoke?token=%s' % access_token
        h = httplib2.Http()
        result = h.request(url, 'GET')[0]
        if result['status'] == '200':
            # Reset the user's sesson.
            del login_session['access_token']
            del login_session['gplus_id']
            del login_session['username']
            del login_session['email']
            del login_session['picture']
            del login_session['user_id']

            response = make_response(
                                     json.dumps('Successfully disconnected from Google.'),
                                     200
                                     )
            response.headers['Content-Type'] = 'application/json'
            return response
        else:
            # For whatever reason, the given token was invalid.
            response = make_response(
                json.dumps('Failed to revoke token for given user.'))
            response.headers['Content-Type'] = 'application/json'
            return response
    else:
        del login_session['username']
        del login_session['email']
        del login_session['picture']
        del login_session['user_id']
        response = make_response(json.dumps('Successfully disconnected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        return response


""" User-related routes  """


@app.route('/api/check_username/<string:user>', methods=["POST"])
def check_username(user):
    user_id = getUserIDByName(user.lower())
    if not user_id:
        return "Ok"
    return "Used"


@app.route('/api/create_user', methods=['POST', 'GET'])
def create_user():
    if request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        if username is '' or password is '' or email is '':
            return "You must provide all fields"
        if session.query(User).filter_by(name=username).first() is not None:
            return "Username used"
        if session.query(User).filter_by(email=email).first() is not None:
            return "Email used"
        user = User(name=username)
        user.hash_password(password)
        user.email = email
        user.picture = "https://picsum.photos/500?random"
        session.add(user)
        session.commit()
        return jsonify({'username': user.name}), 201
    else:
        users = session.query(User).all()
        return jsonify(users=[i.serialize for i in users])


@app.route('/api/check_email/<string:user>', methods=["POST"])
def check_email(user):
    user_id = getUserIDByEmail(user.lower())
    if not user_id:
        return "Ok"
    return "Used"


@app.route('/api/get_user_images/<int:user_id>')
def get_user_images(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    images = session.query(Image).filter_by(user_id=user_id).all()
    return jsonify(images=[i.serialize for i in images], user=user.serialize)


""" Category-related routes  """


@app.route('/api/categories')
def categories():
    categories = session.query(Category).all()
    return jsonify(categories=[i.serialize for i in categories])


@app.route('/api/top_categories')
def top_categories():
    top_categories = session.query(func.count(Image.category_id).label("quantidade"), Category.title, Category.id)\
    .join(Category, Image.category_id == Category.id)\
    .group_by(Image.category_id)\
    .order_by(desc("quantidade"))\
    .limit(6).all()

    return jsonify(top_categories)


@app.route('/api/get_category_details/<string:category>')
def get_category_images(category):
    category = session.query(Category).filter_by(title=category).one()
    return jsonify(
                  images=[i.serialize for i in category.images],
                  category=category.serialize)


""" Image-related routes  """


@app.route('/api/get_image/<string:photo_address>')
def get_image(photo_address):
    filename = 'images/{}.jpeg'.format(photo_address)
    return send_file(filename, mimetype='image/jpeg')


@app.route('/api/get_image_thumb/<string:photo_address>')
def get_image_thumb(photo_address):
    filename = 'thumb/{}.jpeg'.format(photo_address)
    return send_file(filename, mimetype='image/jpeg')


@app.route('/api/get_image_details/<string:address>')
def get_image_details(address):
    try:
        image = session.query(Image).filter_by(address=address).one()
    except Exception:
        return "Image not found"
    return jsonify(image=image.serialize)


""" Upload-related routes  """


@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    target = os.path.join(APP_ROOT, 'images')
    targetThumb = os.path.join(APP_ROOT, 'thumb')
    if not os.path.isdir(target):
        os.mkdir(target)
    fileId = request.headers.get('fileId')
    upload = request.files.get('filepond', '')
    filename = fileId
    destination = "/".join([target, '{}.jpeg'.format(filename)])
    destinationThumb = "/".join([targetThumb, '{}.jpeg'.format(filename)])
    # convert and crop image
    original = ImageEdit.open(upload)
    # Get original dimensions
    width, height = original.size
    # calculate how it should be cropped
    if width > height:
        delta = width - height
        left = int(delta/2)
        upper = 0
        right = height + left
        lower = height
    else:
        delta = height - width
        left = 0
        upper = int(delta/2)
        right = width
        lower = width + upper
    # crop image
    cropped_img = original.crop((left, upper, right, lower))
    # convert to make it a jpeg
    new_im = cropped_img.convert('RGB')
    thumb = new_im.copy()
    new_im.save(destination)
    size = 300, 300
    thumb.thumbnail(size)
    thumb.save(destinationThumb)
    # new_im.show()
    return "Ok"


@app.route('/api/upload_image_details', methods=["POST"])
def upload_image_details():
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    details = json.loads(request.form.get('details'))
    category_id = getCategoryID(details['category'])
    if not category_id:
        category_id = createCategory(title=details['category'])

    image = Image(user_id=details['user_id'],
                  category_id=category_id, title=details['title'],
                  description=details['description'],
                  address=details['address'])
    session.add(image)
    session.commit()
    return 'Ok, uploaded'


""" Edit-related routes  """


@app.route('/api/update_image_details/<int:img_id>', methods=["POST"])
def update_image_details(img_id):
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    details = json.loads(request.form.get('editedDetails'))
    category_id = getCategoryID(details['category'])
    if not category_id:
        category_id = createCategory(title=details['category'])
    editedImage = session.query(Image).filter_by(id=img_id).one()
    if editedImage.user_id != login_session['user_id']:
        return "You are not allowed to do this", 401
    editedImage.title = details['title']
    editedImage.description = details['description']
    editedImage.category_id = category_id
    session.add(editedImage)
    session.commit()
    return 'Ok, edited'


@app.route('/api/delete_image/<int:img_id>', methods=['POST'])
def delete_image(img_id):
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    imageToDelete = session.query(Image).filter_by(id=img_id).one()
    if imageToDelete.user_id != login_session['user_id']:
        return "You are not allowed to do this", 401
    session.delete(imageToDelete)
    session.commit()
    return "Image deleted"


if __name__ == '__main__':
    app.secret_key = 'you_c@n_never_be_too_c@reful'
    app.run(host='0.0.0.0', port=5000)
