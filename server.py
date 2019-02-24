from flask import Flask, render_template, request, redirect, jsonify, url_for, send_file
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from database_setup import Category, Base, Image, User

app = Flask(__name__, static_folder='./frontend/build/static',
            template_folder='./frontend/build')

# Connect to Database and create database session
engine = create_engine('sqlite:///pixcatalog.db')
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

@app.route('/api/get_category_images/<int:category>')
def get_category_images(category):
    images = session.query(Image).filter_by(category_id=category).all()
    return jsonify(images=[i.serialize for i in images])

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


@app.route('/api/get_image/<string:photo_id>')
def get_image(photo_id):
    filename = 'images/{}.jpeg'.format(photo_id)
    return send_file(filename, mimetype='image/jpeg')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
