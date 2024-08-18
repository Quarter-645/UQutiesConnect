from flask import Flask  # type: ignore
from flask_cors import CORS # type: ignore
 
def create_app(): 
    app = Flask(__name__) 
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite" 

    # Load the models 
    from flask_app.models import db 
    from flask_app.models.models import Student, Friendships, StudentCourses, StudentHobbies, StudentClubs
    db.init_app(app) 

    # Create the database tables 
    with app.app_context(): 
        db.create_all() 
        db.session.commit() 

    # Register the blueprints 
    from flask_app.views.routes import api 
    app.register_blueprint(api) 

    return app