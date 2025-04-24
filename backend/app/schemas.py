from . import ma
from .models import Program, Client
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class ProgramSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Program
        include_fk = True
        load_instance = True

class ClientSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Client
        include_fk = True
        load_instance = True
        include_relationships = True

program_schema = ProgramSchema()
programs_schema = ProgramSchema(many=True)
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)