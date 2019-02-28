from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import random, requests, os
from PIL import Image as ImageEdit

from database_setup import Category, Base, Image, User, engine

# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
                       
Base.metadata.drop_all(engine)
print("cleaning db")
Base.metadata.create_all(engine)
print("New tables created")

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

# Create dummy user
User1 = User(name="reinaldooo", email="rewifetri@gmail.com",
             picture='https://picsum.photos/500?random')
session.add(User1)
session.commit()
User2 = User(name="john", email="john@gmail.com",
             picture='https://picsum.photos/500?random')
session.add(User2)
session.commit()
User3 = User(name="travis", email="travis@gmail.com",
             picture='https://picsum.photos/500?random')
session.add(User3)
session.commit()
User4 = User(name="unsplash.com", email="example@unsplash.com",
             picture='https://picsum.photos/500?random')
session.add(User4)
session.commit()

# Menu for UrbanBurger
category1 = Category(title="car")
category2 = Category(title="motorcicle")
category3 = Category(title="city")
category4 = Category(title="water")
category5 = Category(title="mountain")
category6 = Category(title="travel")
category7 = Category(title="brazil")
category8 = Category(title="europe")

session.add(category1)
session.add(category2)
session.add(category3)
session.add(category4)
session.add(category5)
session.add(category6)
session.add(category7)
session.add(category8)
session.commit()

images = [ 
  "img0",
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
  "img9",
  "img10",
  "img11",
  "img12",
  "img13",
  "img14",
  "img15",
  "img16",
  "img17",
  "img18",
  "img19",
  "img20",
  "img21",
  "img22",
  "img23",
  "img24",
  "img25",
  "img26",
  "img27",
  "img28",
  "img29",
  "img30",
  "img31",
  "img32",
  "img33",
  "img34",
  "img35",
  "img36",
  "img37",
  "img38",
  "img39",
  "img40",
  "img41",
  "img42",
  "img43",
  "img44",
  "img45",
  "img46",
  "img47",
  "img48",
  "img49",
  "img50",
  "img51",
  "img52",
  "img53",
  "img54",
  "img55",
  "img56",
  "img57",
  "img58",
  "img59",
  "img60"
]

# """Get random photos"""
# print("Downloading images, this will take a while")
# for i, img in enumerate(images):
#   url = "https://picsum.photos/800?random"
#   response = requests.get(url)
#   if response.status_code == 200:
#     with open("./images/{}.jpeg".format(img), 'wb') as f:
#         f.write(response.content)
#     targetThumb = os.path.join(APP_ROOT, 'thumb')    
#     destinationThumb = "/".join([targetThumb, '{}.jpeg'.format(img)])
#     imgN = ImageEdit.open("{}/images/{}.jpeg".format(APP_ROOT, img))
#     size = 300, 300
#     imgN.thumbnail(size)
#     imgN.save(destinationThumb)

categories = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
]

users = [
  1,
  2,
  3,
  4
]

titles = [
  "Beautiful photo taken at sunset",
  "My last vacation",
  "Look at this view",
  "I love the sea",
  ""
]

descriptions = [
  "Is this real life? I can't believe i'm here",
  "Look at that building, its amazing",
  "Last night we watched the stars for hours, and in the morning we had this amazing view",
  "I dare you to find the error in this picture",
  ""
]

def populate_random():
  for img in images:
    image = Image(user_id=random.choice(users), category_id=random.choice(categories), title=random.choice(titles),
               description=random.choice(descriptions), address=img)
    session.add(image)
    session.commit()

populate_random()
print("added menu items!")
