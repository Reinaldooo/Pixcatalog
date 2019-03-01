from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from passlib.apps import custom_app_context as pwd_context

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)
    picture = Column(String(250))
    pwd_hash = Column(String(250))

    def hash_password(self, password):
        self.pwd_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.pwd_hash)


    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'name': self.name,
            'picture': self.picture,
            'email': self.email
        }


class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    title = Column(String(250), nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'title': self.title,
            'images_total': len(self.images)
        }


class Image(Base):
    __tablename__ = 'image'

    id = Column(Integer, primary_key=True)
    title = Column(String(250), nullable=True)
    description = Column(String(250), nullable=True)
    address = Column(String(250), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User")
    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category", backref='images')

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category_id': self.category_id,
            'category_name': self.category.title,
            'user_id': self.user_id,
            'username': self.user.name,
            'address': self.address,
        }


engine = create_engine('sqlite:///pixcatalog.db',
                       connect_args={'check_same_thread': False})
