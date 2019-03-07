
# !/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import jsonify, json
from sqlalchemy import create_engine, asc, func, desc
from sqlalchemy.orm import sessionmaker
from database_setup import Category, Base, Image, User, engine
from PIL import Image as ImageEdit
import os

# Connect to Database and create database session
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

APP_ROOT = os.path.dirname(os.path.abspath(__file__))


def createUserWithLoginSession(login_session):
    newUser = User(name=login_session['username'], email=login_session[
                   'email'], picture=login_session['picture'])
    session.add(newUser)
    session.commit()
    user = session.query(User).filter_by(email=login_session['email']).one()
    return user.id


def createUser(request):
    username = request.get('username')
    password = request.get('password')
    email = request.get('email')
    if username is '' or password is '' or email is '':
        return "You must provide all fields", 400
    if session.query(User).filter_by(name=username).first() is not None:
        return "Username used", 400
    if session.query(User).filter_by(email=email).first() is not None:
        return "Email used", 400
    user = User(name=username)
    user.hash_password(password)
    user.email = email
    user.picture = "https://picsum.photos/500?random"
    session.add(user)
    session.commit()
    return jsonify({'username': user.name}), 201


def getUserInfo(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    return user


def getUser(username):
    user = session.query(User).filter_by(name=username).one()
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


def getUserImages(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    images = session.query(Image).filter_by(user_id=user_id).all()
    return jsonify(images=[i.serialize for i in images], user=user.serialize)


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


def getCategories():
    categories = session.query(Category).all()
    return jsonify(categories=[i.serialize for i in categories])


def topCategories():
    top = session.query(
                        func.count(Image.category_id).label("quantidade"),
                        Category.title,
                        Category.id)\
                        .join(Category, Image.category_id == Category.id)\
                        .group_by(Image.category_id)\
                        .order_by(desc("quantidade"))\
                        .limit(6).all()
    return jsonify(top)


def getCategoryDetails(category):
    category = session.query(Category).filter_by(title=category).one()
    return jsonify(
                  images=[i.serialize for i in category.images],
                  category=category.serialize)


def getImageDetails(address):
    try:
        image = session.query(Image).filter_by(address=address).one()
    except Exception:
        return "Image not found"
    return jsonify(image=image.serialize)


ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'bmp'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload(login_session, request):
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    if 'filepond' not in request.files:
        return "You must send a image", 400
    target = os.path.join(APP_ROOT, 'images')
    targetThumb = os.path.join(APP_ROOT, 'thumb')
    if not os.path.isdir(target):
        os.mkdir(target)
    if not os.path.isdir(targetThumb):
        os.mkdir(targetThumb)
    fileId = request.headers.get('fileId')
    upload = request.files.get('filepond', '')
    # Protect server from receiving files other than images
    if upload and allowed_file(upload.filename):
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


def uploadImageDetails(login_session, request):
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    details = json.loads(request.form.get('details'))
    category = details.get('category')
    if not category:
        return "You must provide a category name"
    category_id = getCategoryID(details['category'])
    if not category_id:
        category_id = createCategory(title=details['category'])

    image = Image(user_id=details['user_id'],
                  category_id=category_id, title=details['title'],
                  description=details['description'],
                  address=details['address'])
    session.add(image)
    session.commit()
    return jsonify(image.serialize)


def updateImageDetails(login_session, request, img_id):
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    details = json.loads(request.form.get('editedDetails'))
    category = details.get('category')
    if not category:
        return "You must provide a category name"
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
    return jsonify(editedImage.serialize)


def deleteImage(login_session, request):
    if 'username' not in login_session:
        return "You are not allowed to do this", 401
    img_id = request.json.get('imageId')
    imageToDelete = session.query(Image).filter_by(id=img_id).one()
    if imageToDelete.user_id != login_session['user_id']:
        return "You are not allowed to do this", 401
    session.delete(imageToDelete)
    session.commit()
    return "Image deleted"
