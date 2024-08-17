from flask import Blueprint, jsonify, request #type:ignore
from flask_app.models import db
from flask_app.models.models import Student, Friendships, StudentClubs, StudentCourses, StudentHobbies
import re
from datetime import datetime
from sqlalchemy import func

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



###
@api.route('/get_user_details/<string:username>', methods=['GET']) #what method??
def getUserDetails(username): 
    User = ( 
        db.session.query(Student)
        .filter(
            (Student.username == username))
        .first()
        )
    
    if not(User):
        return jsonify({'error': 'User not found.'}), 404
    
    return jsonify([User.username, User.email, User.name, User.degree, User.dateStarted]), 200
    
    # get everything apart from password

@api.route('/recomended_friends', methods=['POST']) 
def getRecommendedFriends():

    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')

    user_courses_subquery = db.session.query(StudentCourses.course).filter_by(username=currentUserUsername).subquery()

    common_courses_query = (
        db.session.query(
            StudentCourses.username, 
            func.count(StudentCourses.course).label('common_courses_count')
        )
        .filter(StudentCourses.course.in_(user_courses_subquery))  # Match courses with those of the given user
        .filter(StudentCourses.username != currentUserUsername)  # Exclude the given user
        .group_by(StudentCourses.username)  # Group by other usernames
        .order_by(func.count(StudentCourses.course).desc())  # Order by the number of common courses
    ).all()

    courses_results = [
        {
            'username': row.username,
            'common_courses_count': row.common_courses_count
        }
        for row in common_courses_query
    ]

    user_hobby_subquery = db.session.query(StudentHobbies.hobby).filter_by(username=currentUserUsername).subquery()

    common_hobbies_query = (
        db.session.query(
            StudentHobbies.username, 
            func.count(StudentHobbies.hobby).label('common_hobbies_count')
        )
        .filter(StudentHobbies.hobby.in_(user_hobby_subquery))  # Match courses with those of the given user
        .filter(StudentHobbies.username != currentUserUsername)  # Exclude the given user
        .group_by(StudentHobbies.username)  # Group by other usernames
        .order_by(func.count(StudentHobbies.hobby).desc())  # Order by the number of common courses
    ).all()

    hobbies_results = [
        {
            'username': row.username,
            'common_hobby_count': row.common_hobbies_count
        }
        for row in common_hobbies_query
    ]

    #return jsonify(hobbies_results),200

    user_club_subquery = db.session.query(StudentClubs.club).filter_by(username=currentUserUsername).subquery()

    common_clubs_query = (
        db.session.query(
            StudentClubs.username, 
            func.count(StudentClubs.club).label('common_clubs_count')
        )
        .filter(StudentClubs.club.in_(user_club_subquery))  # Match courses with those of the given user
        .filter(StudentClubs.username != currentUserUsername)  # Exclude the given user
        .group_by(StudentClubs.username)  # Group by other usernames
        .order_by(func.count(StudentClubs.club).desc())  # Order by the number of common courses
    ).all()

    clubs_results = [
        {
            'username': row.username,
            'common_club_count': row.common_clubs_count
        }
        for row in common_clubs_query
    ]

    result = recommendationMaker(courses_results, hobbies_results, clubs_results)



    return jsonify(result), 200 

def recommendationMaker(users_courses, users_hobbies, users_clubs):
    C = 1.0 #constant for weighting of courses 
    H = 0.25 #for hobbies
    K = 0.75 #for clubs 

    recommendations = dict()

    for user in users_courses:
        username = user.get('username')
        commonalities = user.get('common_courses_count')
        if username in recommendations:
            recommendations[username] += C*int(commonalities)
        else:
            recommendations[username] = C*int(commonalities)

    for user in users_hobbies:
        username = user.get('username')
        commonalities = user.get('common_hobby_count')
        if username in recommendations:
            recommendations[username] += H*int(commonalities)
        else:
            recommendations[username] = H*int(commonalities)   

    for user in users_clubs:
        username = user.get('username')
        commonalities = user.get('common_club_count')
        if username in recommendations:
            recommendations[username] += K*int(commonalities)
        else:
            recommendations[username] = K*int(commonalities) 

    sorted_usernames = sorted(recommendations, key=recommendations.get, reverse=True)

    return sorted_usernames


@api.route('/add_hobby', methods=['POST'])
def addHobby():
    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')
    hobby = data.get('hobby')

    # Check if the hobby is already added for the student
    existing_hobby = (
        db.session.query(StudentHobbies.hobby)
        .filter(
            ((StudentHobbies.username == currentUserUsername) & (StudentHobbies.hobby == hobby))
        )
        .first()
    )

    if existing_hobby:
        return jsonify({'error': 'Hobby already added'}), 403

    newHobby = StudentHobbies(
        username=currentUserUsername,
        hobby=hobby
    )

    db.session.add(newHobby)
    db.session.commit()

    return jsonify({"status": "hobby added"}), 201


@api.route('/remove_hobby', methods=['POST'])
def removeHobby():
    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')
    hobby = data.get('hobby')

    # Check if the hobby exists for that student
    existing_hobby = (
        db.session.query(StudentHobbies)
        .filter(
            ((StudentHobbies.username == currentUserUsername) & (StudentHobbies.hobby == hobby))
        )
        .first()
    )

    if not existing_hobby:
        return jsonify({'error': 'Hobby does not exist'}), 404

    db.session.delete(existing_hobby)
    db.session.commit()

    return jsonify({"status": "hobby removed"}), 200

@api.route('/add_club', methods=['POST'])
def addClub():
    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')
    club = data.get('club')

    # Check if the club is already added for the student
    existing_club = (
        db.session.query(StudentClubs.club)
        .filter(
            ((StudentClubs.username == currentUserUsername) & (StudentClubs.club == club))
        )
        .first()
    )

    if existing_club:
        return jsonify({'error': 'Club already added'}), 403

    newClub = StudentClubs(
        username=currentUserUsername,
        club=club
    )

    db.session.add(newClub)
    db.session.commit()

    return jsonify({"status": "club added"}), 201


@api.route('/remove_club', methods=['POST'])
def removeClub():
    data = request.get_json()
    currentUserUsername = data.get('currentUserUsername')
    club = data.get('club')

    # Check if the club exists for that student
    existing_club = (
        db.session.query(StudentClubs)
        .filter(
            ((StudentClubs.username == currentUserUsername) & (StudentClubs.club == club))
        )
        .first()
    )

    if not existing_club:
        return jsonify({'error': 'Club does not exist'}), 404

    db.session.delete(existing_club)
    db.session.commit()

    return jsonify({"status": "club removed"}), 200