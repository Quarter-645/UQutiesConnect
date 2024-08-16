from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__)

@api.route('/health')
def health():
    return jsonify({"status": "ok"}), 200
    

