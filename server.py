from flask import Flask, render_template, request, redirect, jsonify, url_for

app = Flask(__name__, static_folder='./frontend/build/static', template_folder='./frontend/build')

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

@app.route('/JSON')
def restaurantsJSON():
    return jsonify(jsonTest)
    
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
