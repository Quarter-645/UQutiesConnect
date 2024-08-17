from flask import Blueprint, jsonify, request #type:ignore
from flask_app.models import db
from flask_app.models.models import Student, Friendships, StudentClubs, StudentCourses, StudentHobbies
import re
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/health')
def health():
    return jsonify({"status": "ok"}), 200
    
@api.route('/get_friends/<string:username>', methods=['GET'])
def getFriends(username):
    friendships = (
        db.session.query(Friendships)
        .filter(
            (Friendships.username1 == username) | (Friendships.username2 == username)
        )
        .all()
    )

    friends = []
    for friendship in friendships:
        if friendship.username1 == username:
            friends.append(friendship.username2)
        else:
            friends.append(friendship.username1)

    return jsonify(friends), 200

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

@api.route('/remove_friend', methods=['POST'])
def removeFriend():
    data = request.get_json()

    currentUserUsername = data.get('currentUserUsername')
    friendUsername = data.get('friendUsername')

    friendship = (
        db.session.query(Friendships)
        .filter(
            ((Friendships.username1 == currentUserUsername) & (Friendships.username2 == friendUsername)) |
            ((Friendships.username2 == currentUserUsername) & (Friendships.username1 == friendUsername))
        )
        .first()
    )

    if not friendship:
        return jsonify({'error': 'Friendship does not exist'}), 404
    
    db.session.delete(friendship)
    db.session.commit()
    return jsonify({"status": "friendship removed"}), 200

#request.get
@api.route('/createaccount', methods=['POST'])
def createaccount():
    data = request.get_json()
    #regex email checker if not from UQ return 400
    pattern = r'\b[A-Za-z0-9._%+-]+@uq\.edu\.au\b'
    email = data.get('email')
    if not (re.fullmatch(pattern, email)):
        return jsonify({'error': 'Invalid email address - not from UQ.'}), 400
    #verify that another account hasn't been created already with the same email
    existingStudent = (
        db.session.query(Student)
        .filter(
            (Student.email == email))
    .first()
    )
    if existingStudent is not None:
        return jsonify({'error': 'Student already exsits.'}), 400

    newAccount = Student( 
        username = data.get('username'),
        email = email,
        password = data.get('password'),
        name = data.get('name'), 
        degree = data.get('degree'),
        dateStarted = data.get('dateStarted')
    )

    # Adds a new record to the database or will update an existing record 
    db.session.add(newAccount) 
    # Commits the changes to the database, this must be called for the changes to be saved 
    db.session.commit()
    return jsonify({'status': 'Student created'}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    existing_Student = (
        db.session.query(Student)
        .filter(
            (Student.email == email))
        .first()
    )

    if existing_Student == None:
        return jsonify({'error': 'Student does not exist.'}), 400
    
    if existing_Student.password != password:
        return jsonify({'error': 'Password incorrect.'}), 400


    return jsonify({"message": "Login successful"}), 200

@api.route('/add_course', methods=['POST'])
def addCourse():

    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')
    courseCode = data.get('courseCode')
    
    #check course not already added
    existing_course = (
        db.session.query(StudentCourses.course)
        .filter(
            ((StudentCourses.username == currentUserUsername) & (StudentCourses.course == courseCode))
        )
        .first()
    )    

    if existing_course:
        return jsonify({'error': 'Course already added'}), 403

    newCourse = StudentCourses(
        username = currentUserUsername,
        course = courseCode
    )

    db.session.add(newCourse)
    db.session.commit()

    return jsonify({"status": "course added"}), 201    

@api.route('/remove_course', methods=['POST'])
def removeCourse():

    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')
    courseCode = data.get('courseCode')
    
    #check course exists for that student
    existing_course = (
        db.session.query(StudentCourses)
        .filter(
            ((StudentCourses.username == currentUserUsername) & (StudentCourses.course == courseCode))
        )
        .first()
    )    

    if not(existing_course):
        return jsonify({'error': 'Course does not exist'}), 404

    db.session.delete(existing_course)
    db.session.commit()

    return jsonify({"status": "course removed"}), 200  
