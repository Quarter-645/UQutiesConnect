from flask import Blueprint, jsonify, request
from models import Student, Friendship
import re

api = Blueprint('api', __name__)

@api.route('/health')
def health():
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
        email = request.json.get('email'),
        password = request.json.get('password'),
        name=request.json.get('name'), 
        degree=request.json.get('degree'),
        dateStarted=request.json.get('dateStarted')
    )
    return newAccount

@api.route('/friendships')
def createfriendship():
    newfriendship = Friendship()