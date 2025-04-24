from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from .models import Client, Program
from .schemas import program_schema, programs_schema, client_schema, clients_schema
from . import db
from sqlalchemy.orm import joinedload
from sqlalchemy import or_

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/')
def index():
    return jsonify({"message": "Welcome to HealthTrack Pro API"})

@routes_bp.route('/api/programs', methods=['POST'])
@jwt_required()
def create_program():
    data = request.json
    new_program = Program(name=data['name'], description=data.get('description', ''))
    db.session.add(new_program)
    db.session.commit()
    return jsonify(program_schema.dump(new_program)), 201

@routes_bp.route('/api/programs/<int:id>', methods=['GET'])
@jwt_required()
def get_program(id):
    program = Program.query.get_or_404(id)
    return jsonify(program_schema.dump(program))

@routes_bp.route('/api/programs', methods=['GET'])
@jwt_required()
def get_programs():
    programs = Program.query.all()
    return programs_schema.jsonify(programs)

@routes_bp.route('/api/clients', methods=['POST'])
@jwt_required()
def create_client():
    data = request.json
    program_ids = data.pop('program_ids', [])  # Optional list of program IDs from client input

    # Fetch corresponding Program objects
    programs = Program.query.filter(Program.id.in_(program_ids)).all()

    # Optional: validate that all provided IDs were found
    if len(programs) != len(program_ids):
        return jsonify({"error": "One or more program IDs are invalid."}), 400

    # Create the client and assign programs
    new_client = Client(**data)
    new_client.programs = programs

    db.session.add(new_client)
    db.session.commit()
    return jsonify(client_schema.dump(new_client)), 201

@routes_bp.route('/api/clients/<int:id>', methods=['GET'])
@jwt_required()
def get_client(id):
    client = Client.query.get_or_404(id)
    return jsonify(client_schema.dump(client))

@routes_bp.route('/api/clients/search', methods=['GET'])
@jwt_required()
def search_clients():
    query = request.args.get('q', '')
    
    clients = Client.query.options(joinedload(Client.programs)).filter(
        or_(
            Client.first_name.ilike(f'%{query}%'),
            Client.last_name.ilike(f'%{query}%'),
            Program.name.ilike(f'%{query}%')
        )
    ).join(Client.programs).distinct().all()

    return clients_schema.jsonify(clients)