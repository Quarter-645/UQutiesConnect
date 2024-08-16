from flask import Flask  # type: ignore
 
def create_app(): 
    app = Flask(__name__) 

    # Register the blueprints 
    from flask_app.views.routes import api 
    app.register_blueprint(api) 

    return app