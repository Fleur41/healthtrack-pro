from flask import request, jsonify
from flask_jwt_extended import jwt_required
from . import app, db
from .models import Client, Program
from .schemas import program_schema, programs_schema, client_schema, clients_schema

@app.route('/api/programs', methods=['POST'])
@jwt_required()
def create_program():
    data = request.json
    new_program = Program(name=data['name'], description=data.get('description', ''))
    db.session.add(new_program)
    db.session.commit()
    return program_schema.jsonify(new_program), 201

@app.route('/api/clients', methods=['POST'])
@jwt_required()
def create_client():
    data = request.json
    new_client = Client(**data)
    db.session.add(new_client)
    db.session.commit()
    return client_schema.jsonify(new_client), 201

@app.route('/api/clients/<int:id>', methods=['GET'])
@jwt_required()
def get_client(id):
    client = Client.query.get_or_404(id)
    return client_schema.jsonify(client)

@app.route('/api/clients/search', methods=['GET'])
@jwt_required()
def search_clients():
    query = request.args.get('q', '')
    clients = Client.query.filter(
        (Client.first_name.ilike(f'%{query}%')) | 
        (Client.last_name.ilike(f'%{query}%'))
    ).all()
    return clients_schema.jsonify(clients)