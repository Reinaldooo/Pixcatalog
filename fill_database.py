from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Category, Base, Image, User

engine = create_engine('sqlite:///pixcatalog.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
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


# Create dummy user
User1 = User(name="Reinaldo Trindade", email="rewifetri@gmail.com",
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

# Menu for UrbanBurger
category1 = Category(title="car")
category2 = Category(title="motorcicle")
category3 = Category(title="city")
category4 = Category(title="water")
category5 = Category(title="mountain")
category6 = Category(title="travel")

session.add(category1)
session.add(category2)
session.add(category3)
session.add(category4)
session.add(category5)
session.add(category6)
session.commit()

image1 = Image(user_id=1, category_id="1", title="Veggie Burger",
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", address='img1')
image2 = Image(user_id=2, category_id="1", address='img2')
image3 = Image(user_id=2, category_id="1", title="Normal Burger", address='img3',
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
image4 = Image(user_id=2, category_id="4",
               title="Normal Burger", address='img4')
image5 = Image(user_id=3, category_id="4", title="Normal Burger", address='img5',
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
image6 = Image(user_id=3, category_id="2", address='img6')
image7 = Image(user_id=3, category_id="2",
               title="Normal Burger", address='img7')
image8 = Image(user_id=3, category_id="3", address='img8')
image9 = Image(user_id=1, category_id="3", title="Normal Burger", address='img9',
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
image10 = Image(user_id=1, category_id="3", title="Normal Burger", address='img10',
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
image11 = Image(user_id=3, category_id="5", address='img11')
image12 = Image(user_id=1, category_id="6",
               title="Normal Burger", address='img12')
image13 = Image(user_id=1, category_id="6", title="Normal Burger", address='img13',
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
image14 = Image(user_id=2, category_id="5", title="Normal Burger", address='img14',
               description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
image15 = Image(user_id=2, category_id="5",
               title="Normal Burger", address='img15')

session.add(image1)
session.add(image2)
session.add(image3)
session.add(image4)
session.add(image5)
session.add(image6)
session.add(image7)
session.add(image8)
session.add(image9)
session.add(image10)
session.add(image11)
session.add(image12)
session.add(image13)
session.add(image14)
session.add(image15)
session.commit()

print("added menu items!")
