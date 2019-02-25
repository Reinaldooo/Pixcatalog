from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)
    picture = Column(String(250))

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'name': self.name,
            'picture': self.picture
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
    category = relationship("Category")

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
Base.metadata.create_all(engine)
