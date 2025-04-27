import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-dev-key-please-change')
    
    # MySQL configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 
        'mysql://healthtrack:Admin@123@db:3306/healthtrack_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
