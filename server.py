from flask import Flask, render_template, request, redirect, jsonify, url_for, send_file
from sqlalchemy import create_engine, asc, func
from sqlalchemy.orm import sessionmaker
from database_setup import Category, Base, Image, User, engine

app = Flask(__name__, static_folder='./frontend/build/static',
            template_folder='./frontend/build')

# Connect to Database and create database session
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/api/categories')
def categories():
    categories = session.query(Category).all()
    return jsonify(categories=[i.serialize for i in categories])

@app.route('/api/top_categories')
def top_categories():
    top_categories = session.query(func.count(Image.category_id).label('unidades'),Image.category.title).group_by(Image.category_id).order_by("unidades DESC").all()
    print(top_categories)
    # return jsonify(categories=[i.serialize for i in top_categories])
    return "ha"


@app.route('/api/get_category_details/<int:category_id>')
def get_category_images(category_id):
    category = session.query(Category).filter_by(id=category_id).one()
    images = session.query(Image).filter_by(category_id=category_id).all()
    return jsonify(images=[i.serialize for i in images], category=category.serialize, images_total=len(images))


@app.route('/api/JSON')
def JSON():
    categories = session.query(Category).all()
    users = session.query(User).all()
    images = session.query(Image).all()
    return jsonify(categories=[i.serialize for i in categories], users=[i.serialize for i in users], images=[i.serialize for i in images])


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
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
