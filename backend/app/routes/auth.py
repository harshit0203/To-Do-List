from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/check", methods=["GET"])
def check_login():
    if "user_id" in session:
        return jsonify({"status": True, "message": "Logged in"})
    return jsonify({"status": False, "message": "Not logged in"})


@auth_bp.route("/register", methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get("username","").strip()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not(username) or not(email) or not(password):
            return jsonify({"status": False, "message": "All fields are required." }), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"status": False, "message": "User already exists."}), 400
    
        hashedPassword = generate_password_hash(password, method="pbkdf2:sha256", salt_length=10)

        new_user = User(username = username, email = email, password = hashedPassword)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"status": True, "message": "User added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": f"Error occurred: {e}"}) ,500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not(email) or not(password):
            return jsonify({"status": False, "message": "Email/Password is required for login." }), 400

        existing_user = User.query.filter_by(email = email).first()
        if not existing_user:
            return jsonify({"status": False, "message": "Email/Password is required for login."}), 400

        is_valid_pass = check_password_hash(existing_user.password, password)
        if not is_valid_pass:
            return jsonify({"status": False, "message": "Invalid Password"}), 400
            
        session['username'] = existing_user.username
        session['email'] = existing_user.email
        session['user_id'] = existing_user.id
        return jsonify({"status": True, "message": "User logged in successfully!"}), 200

    except Exception as e:
        return jsonify({"error": f"Error occurred: {e}"}) ,500


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"status": True, "message": "Logged out successfully!"}), 200