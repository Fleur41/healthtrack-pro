def test_create_client(client, auth_token):
    # Create programs first
    headers = {'Authorization': f'Bearer {auth_token}'}
    
    program1 = client.post('/api/programs', 
        headers=headers,
        json={'name': 'Test Program 1', 'description': 'Description 1'})
    program2 = client.post('/api/programs',
        headers=headers,
        json={'name': 'Test Program 2', 'description': 'Description 2'})
    
    program_ids = [p.get_json()['id'] for p in [program1, program2]]
    
    response = client.post('/api/clients',
        headers=headers,
        json={
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'test@example.com',
            'program_ids': program_ids
        })
    
    assert response.status_code == 201
    data = response.get_json()
    assert data['first_name'] == 'Test'
    assert len(data['programs']) == 2

def test_get_client(client, auth_token):
    # Create client first
    headers = {'Authorization': f'Bearer {auth_token}'}
    create_response = client.post('/api/clients',
        headers=headers,
        json={
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'test@example.com',
            'program_ids': []
        })
    
    client_id = create_response.get_json()['id']
    
    response = client.get(f'/api/clients/{client_id}',
        headers=headers)
    
    assert response.status_code == 200
    assert response.get_json()['email'] == 'test@example.com'