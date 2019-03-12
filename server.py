#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, jsonify
from flask import send_file, json, make_response, abort
from flask import session as login_session
# from flask_wtf.csrf import CSRFProtect, CSRFError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import random
import string
import httplib2
import os
import requests
import crudHelper

app = Flask(__name__, static_folder='./frontend/build/static',
            template_folder='./frontend/build')
# csrf = CSRFProtect()

CLIENT_ID = json.loads(
    open('secret.json', 'r').read())['web']['client_id']
APPLICATION_NAME = "PixCatalog"


# @app.errorhandler(CSRFError)
# def handle_csrf_error(e):
#     return "Sorry, requests are only accepted from within the website.", 400


@app.route('/', defaults={'path': ''}, methods=["GET", "DELETE"])
@app.route('/<path:path>')
def index(path):
    # JS fileupload will send a delete request if the user
    # aborts the upload. this is only here to avoid nasty errors
    # in the console
    if request.method == "DELETE":
        print(request)
    return render_template('index.html')


""" Credentials-related routes """


@app.route('/api/get_token')
def get_token():
    state = ''.join(
        random.choice(
            string.ascii_uppercase + string.digits) for x in range(32))
    login_session['serverToken'] = state
    return state


@app.route('/api/check_credentials')
def check_credentials():
    if 'username' in login_session:
        return jsonify(
                      username=login_session['username'],
                      email=login_session['email'],
                      user_id=login_session['user_id'],
                      picture=login_session['picture']
                      )
    else:
        return jsonify(error="Not logged in")


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
        if login_session.get('username') is not None:
            return "User already connected"
        try:
            user = crudHelper.getUser(username)
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
                          user_id=user.id,
                          picture=user.picture
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
    url = (
        'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={}'
        .format(
            access_token))
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

    user_id = crudHelper.getUserIDByEmail(login_session['email'])
    if not user_id:
        user_id = crudHelper.createUserWithLoginSession(login_session)
    login_session['user_id'] = user_id

    return jsonify(
                  status="Ok",
                  username=login_session['username'],
                  email=login_session['email'],
                  user_id=login_session['user_id'],
                  picture=login_session['picture']
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
        url = 'https://accounts.google.com/o/oauth2/revoke?token={}'.format(
            access_token)
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

            response = make_response(json.dumps(
                'Successfully disconnected from Google.'), 200)
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


@app.route('/api/check_username', methods=["POST"])
def check_username():
    user = request.json.get('username')
    user_id = crudHelper.getUserIDByName(user.lower())
    if not user_id:
        return "Ok"
    return "Used"


@app.route('/api/create_user', methods=['POST'])
def create_user():
    return crudHelper.createUser(request.json)


@app.route('/api/check_email', methods=["POST"])
def check_email():
    email = request.json.get('email')
    user_id = crudHelper.getUserIDByEmail(email.lower())
    if not user_id:
        return "Ok"
    return "Used"


@app.route('/api/get_user_images/<int:user_id>')
def get_user_images(user_id):
    return crudHelper.getUserImages(user_id)


""" Category-related routes  """


@app.route('/api/categories')
def categories():
    return crudHelper.getCategories()


@app.route('/api/top_categories')
def top_categories():
    return crudHelper.topCategories()


@app.route('/api/get_category_details/<string:category>')
def get_category_details(category):
    return crudHelper.getCategoryDetails(category)


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
    return crudHelper.getImageDetails(address)


""" Upload-related routes  """


@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    return crudHelper.upload(login_session, request)


@app.route('/api/upload_image_details', methods=["POST"])
def upload_image_details():
    return crudHelper.uploadImageDetails(login_session, request)


""" Edit-related routes  """


@app.route('/api/update_image_details/<int:img_id>', methods=["POST"])
def update_image_details(img_id):
    return crudHelper.updateImageDetails(login_session, request, img_id)


@app.route('/api/delete_image', methods=['POST'])
def delete_image():
    return crudHelper.deleteImage(login_session, request)


if __name__ == '__main__':
    # Use PORT if it's there.
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    # csrf.init_app(app)
    app.secret_key = 'you_c@n_never_be_too_c@reful'
    app.run(host='0.0.0.0', port=port)
