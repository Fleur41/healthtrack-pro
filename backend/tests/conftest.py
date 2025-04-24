import pytest
from app import create_app, db
from app.models import User, Client, Program

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def auth_token(client):
    # Create test user
    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'password': 'testpass'
    })
    # Login to get token
    response = client.post('/api/auth/login', json={
        'username': 'testuser',
        'password': 'testpass'
    })
    return response.get_json()['access_token']