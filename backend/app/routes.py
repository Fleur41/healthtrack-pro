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

@routes_bp.route('/api/programs', methods=['GET', 'POST'])
@jwt_required()
def programs():
    if request.method == 'POST':
        data = request.json
        
        # Check if program with same name exists
        existing_program = Program.query.filter_by(name=data['name']).first()
        if existing_program:
            return jsonify({
                'error': 'A program with this name already exists'
            }), 409  # 409 Conflict
            
        new_program = Program(
            name=data['name'], 
            description=data.get('description', '')
        )
        
        try:
            db.session.add(new_program)
            db.session.commit()
            return jsonify(program_schema.dump(new_program)), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({
                'error': 'An error occurred while creating the program'
            }), 500
    else:
        programs = Program.query.all()
        return jsonify(programs_schema.dump(programs))

@routes_bp.route('/api/programs/<int:id>', methods=['GET'])
@jwt_required()
def get_program(id):
    program = Program.query.get_or_404(id)
    return jsonify(program_schema.dump(program))

@routes_bp.route('/api/clients', methods=['GET', 'POST'])
@jwt_required()
def clients():
    if request.method == 'POST':
        data = request.json
        
        # Check if client with same email exists
        existing_client = Client.query.filter_by(email=data['email']).first()
        if existing_client:
            return jsonify({
                'error': 'A client with this email already exists'
            }), 409
            
        program_ids = data.pop('program_ids', [])
        programs = Program.query.filter(Program.id.in_(program_ids)).all()
        
        try:
            new_client = Client(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email']
            )
            new_client.programs.extend(programs)
            
            db.session.add(new_client)
            db.session.commit()
            return jsonify(client_schema.dump(new_client)), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({
                'error': str(e)
            }), 400
    else:
        clients = Client.query.all()
        return jsonify(clients_schema.dump(clients))

@routes_bp.route('/api/clients/<int:id>', methods=['GET'])
@jwt_required()
def get_client(id):
    client = Client.query.options(joinedload(Client.programs)).get_or_404(id)
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