from app.models import Client, Program, User
from app import db

def test_client_creation(test_client):
    """Test client model creation"""
    client = Client(
        first_name="John",
        last_name="Doe",
        email="john@example.com"
    )
    db.session.add(client)
    db.session.commit()
    assert client.id is not None

def test_program_creation(test_client):
    """Test program model creation"""
    program = Program(name="Malaria", description="Malaria treatment")
    db.session.add(program)
    db.session.commit()
    assert program.id is not None