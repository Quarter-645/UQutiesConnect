from flask import Blueprint, jsonify, request
from flask_app.models import db
from flask_app.models.models import Student, Friendship
import re

api = Blueprint('api', __name__)

@api.route('/health')
def health():
    return jsonify({"status": "ok"}), 200
    
@api.route('/add_friend', methods=['POST'])
def addFriend():
    data = request.get_json()
    newFriendship = Friendships(
        username1 = data.get('currentUserUsername'),
        username2 = data.get('newFriendUsername'),
        dateCreated = data.get('dateCreated')
    )

    db.session.add(newFriendship)
    db.session.commit()
    return jsonify({"status": "ok"}), 200

#request.get
@api.route('/createaccount', methods=['POST'])
def createaccount():
    #regex email checker if not from UQ return 400
    pattern = r'\b[A-Za-z0-9._%+-]+@uq\.edu\.au\b'
    email = request.json.get('email')
    if not (re.fullmatch(pattern, email)):
        return jsonify({'error': 'Invalid email address - not from UQ'}), 400

    newAccount = Student( 
        username = request.json.get('username'),
        email = email,
        password = request.json.get('password'),
        name=request.json.get('name'), 
        degree=request.json.get('degree'),
        dateStarted=request.json.get('dateStarted')
    )

    # Adds a new record to the database or will update an existing record 
    db.session.add(Student) 
    # Commits the changes to the database, this must be called for the changes to be saved 
    db.session.commit() 
    return jsonify(Student.to_dict(), {'status': 'ok'}), 201

@api.route('/login', methods=['POST'])
def login():
    getUsername = request.json


