from datetime import datetime, timezone

from . import db

#WIP for DB implementation

class Student(db.Model): 
  __tablename__ = "Students"

  username = db.Column(db.String(36), primary_key = True)
  email = db.Column(db.String(255), unique = True)
  password = db.Column(db.String(255))
  name = db.Column(db.String(255), nullable = False)
  degree = db.Column(db.String(255), nullable = False)
  dateStarted = db.Column(db.DateTime, nullable=False)

class Friendships(db.Model):
  __tablename__ = "Friendships"

  friendshipID = db.Column(db.Integer(), primary_key = True, autoincrement = True)
  username1 = db.Column(db.String(255), db.ForeignKey('Students.username'))
  username2 = db.Column(db.String(255), db.ForeignKey('Students.username'))
  dateCreated = db.Column(db.String(50), nullable = False) #DD-MM-YYYY Format

class StudentCourses(db.Model): #as each student has multiple courses, hobbies, clubs etc, stored in own table
  __tablename__ = "StudentCourses"

  SCkey = db.Column(db.String(36), primary_key = True) 
  username = db.Column(db.String(255), db.ForeignKey('Students.username'), nullable = False)
  course = db.Column(db.String(1024))

class StudentHobbies(db.Model):
  __tablename__ = "StudentHobbies"

  SHkey = db.Column(db.String(36), primary_key = True) 
  username = db.Column(db.String(255), db.ForeignKey('Students.username'), nullable = False)
  hobby = db.Column(db.String(1024))

class StudentClubs(db.Model):
  __tablename__ = "StudentClubs"

  SClubkey = db.Column(db.String(36), primary_key = True) 
  username = db.Column(db.String(255), db.ForeignKey('Students.username'), nullable = False)
  club = db.Column(db.String(1024))




####### EXAMPLE CODE FROM OLD PROJECT FOR EXAMPLE USE ONLY, UPDATE TO FIT OUR NEEDS #######

# each of these represents a table in the database
class Users(db.Model):
  __tablename__ = 'users'
  
  id = db.Column(db.String(36), primary_key=True)
  username = db.Column(db.String(255), unique=True)
  email = db.Column(db.String(255), unique=True, nullable=False, index=True)
  login_token = db.Column(db.String(255), unique=True, nullable=True)
  password = db.Column(db.String(255), nullable=False)
  first_name = db.Column(db.String(255), nullable=False)
  last_name = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))


class Recipes(db.Model):
  __tablename__ = 'recipes'
  
  id = db.Column(db.String(36), primary_key=True)
  user_id = db.Column(db.String(255), db.ForeignKey('users.id'), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  steps = db.Column(db.JSON, nullable=False)
  dietary_options = db.Column(db.JSON)
  ingredient_list = db.Column(db.JSON, nullable=False)
  origin_country = db.Column(db.String(60))
  path_to_file = db.Column(db.String(100))
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
  
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
      'description': self.description,
      'steps': self.steps,
      'dietary_options': self.dietary_options,
      'ingredient_list': self.ingredient_list,
      'origin_country': self.origin_country,
      'path_to_file': self.path_to_file,
      'created_at': self.created_at
    }

class Likes(db.Model):
  __tablename__ = 'likes'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  recipe_id = db.Column(db.String(36), db.ForeignKey('recipes.id'), nullable=False)
  
class Comments(db.Model):
  __tablename__ = 'comments'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  # user_id = db.Column(db.Integer, db.ForeignKey('users.email'))
  recipe_id = db.Column(db.String(36), db.ForeignKey('recipes.id'), nullable=False)
  content = db.Column(db.String(255), nullable=False)
