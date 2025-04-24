def test_create_program(client, auth_token):
    headers = {'Authorization': f'Bearer {auth_token}'}
    response = client.post('/api/programs',
        headers=headers,
        json={
            'name': 'Test Program',
            'description': 'Test Description'
        })
    
    assert response.status_code == 201
    data = response.get_json()
    assert data['name'] == 'Test Program'
    assert 'created_at' in data

def test_get_program(client, auth_token):
    # Create program first
    headers = {'Authorization': f'Bearer {auth_token}'}
    create_response = client.post('/api/programs',
        headers=headers,
        json={
            'name': 'Test Program',
            'description': 'Test Description'
        })
    
    program_id = create_response.get_json()['id']
    
    response = client.get(f'/api/programs/{program_id}',
        headers=headers)
    
    assert response.status_code == 200
    assert response.get_json()['name'] == 'Test Program'