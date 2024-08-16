from flask import Flask  # type: ignore
from flask_cors import CORS # type: ignore
from game_service.extensions.LimiterExtension import limiter
 
def create_app(): 
    app = Flask(__name__) 

    # Register the blueprints 
    from flask.views.routes import api 
    app.register_blueprint(api) 

    return app