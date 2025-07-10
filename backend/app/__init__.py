from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import secrets
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    load_dotenv() 

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or secrets.token_hex(32)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    allowed_origins = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000').split(',')

    CORS(app, supports_credentials=True, origins=allowed_origins)    
    from app.routes import auth_bp, todo_bp
    
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(todo_bp, url_prefix="/api/todo")

    return app 