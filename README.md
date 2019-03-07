<p  align="center">
<img  height="200px"  src="./Header.svg">
</p>  

### PixCatalog  

<p  align="center">
PixCatalog is a category-based site for you to upload your favourite photos.
</p> 

![Example PNG](/Example.png)

The app is fully responsive, so you can use it on your phone or tablet.

### This project was created using Javascript and Python with the help of the following tools:

* ReactJS
* React Router
* Styled Components
* Google Oauth API
* Flask
* SQLAlchemy
* Pillow

### App Design

The development focus was to create a lightweight and elegant app, thats why ReactJS was chosen for the front-end, using React Router to guarantee the smoothness of a single-page app. On the server side we have Flask taking care of requests and security, while SQLAlchemy handles the database work.
  
### Run this project

* To load it via Heroku, click [here](https://pixcatalog.herokuapp.com/).

##### To load it in your local machine:

* `Python 3` is required to run this app locally, you can get it [here](https://www.python.org/).
* `npm` is also needed, you can install it with NodeJS. [Download](https://nodejs.org/en/).
* Download or clone this repo using `git clone https://github.com/Reinaldooo/Pixcatalog.git` on a new terminal window.
* Enter the folder with `cd Pixcatalog`.
* Install the dependencies with `pip install -r requirements.txt`.
* In case you have any errors, you can try `sudo pip install -r requirements.txt`.
* Now you can install the frontend dependencies using `npm run custom-build`.
* To setup the database, execute `npm run database-setup`.
* Finally, you can use the command `python server.py` to start the server.
* You case you have any errors, try using `python3 server.py`.
* The app will be running on ```localhost:5000```