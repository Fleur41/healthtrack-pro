import json
from app.models import Client, Program

def test_create_client(test_client):
    """Test client creation via API"""
    response = test_client.post('/api/clients', json={
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane@example.com"
    })
    assert response.status_code == 201
    assert b"Jane" in response.data

def test_search_clients(test_client):
    """Test client search endpoint"""
    test_client.post('/api/clients', json={
        "first_name": "Alice",
        "last_name": "Johnson",
        "email": "alice@example.com"
    })
    response = test_client.get('/api/clients/search?q=Alice')
    assert response.status_code == 200
    assert b"Alice" in response.data