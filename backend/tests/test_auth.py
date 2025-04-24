def test_register(client):
    response = client.post('/api/auth/register', json={
        'username': 'newuser',
        'password': 'password123'
    })
    assert response.status_code == 201
    assert 'user_id' in response.get_json()

def test_login(client):
    # Register user first
    client.post('/api/auth/register', json={
        'username': 'testuser',
        'password': 'testpass'
    })
    
    # Test login
    response = client.post('/api/auth/login', json={
        'username': 'testuser',
        'password': 'testpass'
    })
    assert response.status_code == 200
    assert 'access_token' in response.get_json()