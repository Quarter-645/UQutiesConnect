from flask import Blueprint, jsonify, request
from flask_app.models.models import Friendships
from flask_app.models import db

api = Blueprint('api', __name__)

@api.route('/health')
def health():
    return jsonify({"status": "ok"}), 200
    
@api.route('/add_friend', methods=['POST'])
def makeFriend():
    data = request.get_json()
    newFriendship = Friendships(
        username1 = data.get('currentUserUsername'),
        username2 = data.get('newFriendUsername'),
        dateCreated = data.get('dateCreated')
    )

    db.session.add(newFriendship)
    db.session.commit()
    return jsonify({"status": "ok"}), 200