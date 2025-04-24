from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User

auth_bp = Blueprint('auth', __name__)

# Register route
@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
        
    user = User(username=data['username'])
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'message': 'User created successfully',
        'user_id': user.id
    }), 201

# Login route
@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

# Protected route
@auth_bp.route('/api/auth/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200















# from flask import request, jsonify, Blueprint
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from werkzeug.security import generate_password_hash, check_password_hash
# from . import app, db
# from .models import User

# # Mock user model (add to models.py)
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password_hash = db.Column(db.String(128))

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/auth/login', methods=['POST'])
# def login():
#     return jsonify({"message": "Login endpoint"})

# @app.route('/api/auth/register', methods=['POST'])
# def register():
#     data = request.json
#     if User.query.filter_by(username=data['username']).first():
#         return jsonify({"error": "Username already exists"}), 400
    
#     user = User(username=data['username'])
#     user.set_password(data['password'])
#     db.session.add(user)
#     db.session.commit()
    
#     return jsonify({"message": "User created successfully"}), 201

# @app.route('/api/auth/login', methods=['POST'])
# def login_api():
#     data = request.json
#     user = User.query.filter_by(username=data['username']).first()
    
#     if not user or not user.check_password(data['password']):
#         return jsonify({"error": "Invalid credentials"}), 401
    
#     access_token = create_access_token(identity=user.id)
#     return jsonify({"access_token": access_token}), 200

# @app.route('/api/auth/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200