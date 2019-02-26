from flask import Flask, render_template, request, redirect, jsonify, url_for, send_file, json
from flask import session as login_session
from sqlalchemy import create_engine, asc, func, desc
from sqlalchemy.orm import sessionmaker
from database_setup import Category, Base, Image, User, engine
from operator import itemgetter
import random
import string
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
import json
from flask import make_response
import requests

app = Flask(__name__, static_folder='./frontend/build/static',
            template_folder='./frontend/build')

CLIENT_ID = json.loads(
    open('secret.json', 'r').read())['web']['client_id']
APPLICATION_NAME = "PixCatalog"

# Connect to Database and create database session
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/api/get_token')
def login():
    state = ''.join(
        random.choice(string.ascii_uppercase + string.digits) for x in range(32))
    login_session['serverToken'] = state
    # return "The current session state is %s" % login_session['state']
    return state


@app.route('/gconnect', methods=['POST'])
def gconnect():
    # Validate state token
    if request.args.get('serverToken') != login_session['serverToken']:
        response = make_response(json.dumps('Invalid state parameter.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    # Obtain authorization code, now compatible with Python3
    code = request.args.get('code')

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
        response = make_response(json.dumps('Current user is already connected.'),
                                 200)
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

    user_id = getUserID(login_session['email'])
    if not user_id:
        user_id = createUser(login_session)
    login_session['user_id'] = user_id

    return jsonify(username=login_session['username'], email=login_session['email'], user_id=login_session['user_id'])


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


def getUserID(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user.id
    except:
        return None


@app.route('/check_credentials')
def check():
    if 'username' in login_session:
        return jsonify(username=login_session['username'], email=login_session['email'], user_id=login_session['user_id'])
    else:
        return jsonify(error="Not logged in")


@app.route('/gdisconnect')
def gdisconnect():
        # Only disconnect a connected user.
    access_token = login_session.get('access_token')
    if access_token is None:
        response = make_response(
            json.dumps('Current user not connected.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
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

        response = make_response(json.dumps('Successfully disconnected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        return response
    else:
        # For whatever reason, the given token was invalid.
        response = make_response(
            json.dumps('Failed to revoke token for given user.'))
        response.headers['Content-Type'] = 'application/json'
        return response


@app.route('/api/categories')
def categories():
    categories = session.query(Category).all()
    return jsonify(categories=[i.serialize for i in categories])


# @app.route('/api/top_categories')
# def top_categories():
#     top_categories = session.query(func.count(Image.category_id).label('unidades'),Image.category_id).group_by(Image.category_id).order_by("unidades DESC").all()
#     print(top_categories)
#     # return jsonify(categories=[i.serialize for i in top_categories])
#     return "ha"


@app.route('/api/top_categories')
def top_categories():
    top_categories = session.query(func.count(Image.category_id).label("quantidade"), Category.title, Category.id)\
    .join(Category, Image.category_id == Category.id)\
    .group_by(Image.category_id)\
    .order_by(desc("quantidade"))\
    .limit(6).all()
    return jsonify(top_categories)


@app.route('/api/get_category_details/<int:category_id>')
def get_category_images(category_id):
    category = session.query(Category).filter_by(id=category_id).one()
    return jsonify(images=[i.serialize for i in category.images], category=category.serialize)


@app.route('/api/get_image_details/<string:address>')
def img_details(address):
    image = session.query(Image).filter_by(address=address).one()
    return jsonify(image=image.serialize)


@app.route('/api/get_user_images/<int:user_id>')
def get_user_images(user_id):
    images = session.query(Image).filter_by(user_id=user_id).all()
    return jsonify(images=[i.serialize for i in images])


@app.route('/api/get_image/<string:photo_address>')
def get_image(photo_address):
    filename = 'images/{}.jpeg'.format(photo_address)
    return send_file(filename, mimetype='image/jpeg')


if __name__ == '__main__':
    app.secret_key = 'you_c@n_never_be_too_c@reful'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
