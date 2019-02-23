from flask import Flask, render_template, request, redirect, jsonify, url_for, send_file

app = Flask(__name__, static_folder='./frontend/build/static',
            template_folder='./frontend/build')

jsonTest = {
    'hue': [
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
        {'ha': 'Reinaldo'},
    ]
}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/JSON')
def restaurantsJSON():
    return jsonify(jsonTest)

@app.route('/get_image/<int:photo_id>')
def get_image(photo_id):
    print(photo_id)
    filename = 'images/{}.jpg'.format(photo_id)
    return send_file(filename, mimetype='image/jpg')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
