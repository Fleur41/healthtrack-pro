from . import ma
from .models import Client, Program

class ProgramSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Program

class ClientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Client
    
    programs = ma.Nested(ProgramSchema, many=True)

program_schema = ProgramSchema()
programs_schema = ProgramSchema(many=True)
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)