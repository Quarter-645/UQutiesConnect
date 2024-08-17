from flask import Blueprint, jsonify, request #type:ignore
from flask_app.models import db
from flask_app.models.models import Student, Friendships
import re
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/health')
def health():
    return jsonify({"status": "ok"}), 200
    
@api.route('/add_friend', methods=['POST'])
def addFriend():
    data = request.get_json()

    currentUserUsername = data.get('currentUserUsername')
    newFriendUsername = data.get('newFriendUsername')

    # Format the date as DD-MM-YYYY
    formatted_date = datetime.now().strftime("%d-%m-%Y") 
    
    # Get Friendships connected to the current user
    existing_friendships = (
        db.session.query(Friendships)
        .filter(
            ((Friendships.username1 == currentUserUsername) & (Friendships.username2 == newFriendUsername)) |
            ((Friendships.username2 == currentUserUsername) & (Friendships.username1 == newFriendUsername))
        )
        .all()
    )

    if len(existing_friendships) > 0:
        return jsonify({'error': 'Friendship already exists'}), 403

    newFriendship = Friendships(
        username1 = currentUserUsername,
        username2 = newFriendUsername,
        dateCreated = formatted_date
    )

    db.session.add(newFriendship)
    db.session.commit()

    return jsonify({"status": "friendship created"}), 201

#request.get
@api.route('/createaccount', methods=['POST'])
def createaccount():
    #regex email checker if not from UQ return 400
    # pattern = r'\b[A-Za-z0-9._%+-]+@uq\.edu\.au\b'
    # email = request.json.get('email')
    # if not (re.fullmatch(pattern, email)):
    #     return jsonify({'error': 'Invalid email address - not from UQ'}), 400

    # newAccount = Student( 
    #     username = request.json.get('username'),
    #     email = email,
    #     password = request.json.get('password'),
    #     name=request.json.get('name'), 
    #     degree=request.json.get('degree'),
    #     dateStarted=request.json.get('dateStarted')
    # )

    # # Adds a new record to the database or will update an existing record 
    # db.session.add(Student) 
    # # Commits the changes to the database, this must be called for the changes to be saved 
    # db.session.commit() 
    # return jsonify(Student.to_dict(), {'status': 'ok'}), 201
    return jsonify("ok"), 201


@api.route('/login', methods=['POST'])
def login():

    username = request.json.get('username')
    password = request.json.get('password')

    existing_Student = (
        db.session.query(Student)
        .filter(
            (Student.username == username) & (Student.password == password))
        .all()
    )
    return jsonify({"message": "Login successful", "username": Student.username}), 200


