from . import db

client_program = db.Table('client_program',
    db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True),
    db.Column('program_id', db.Integer, db.ForeignKey('program.id'), primary_key=True)
)

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.String(50), default=db.func.current_timestamp())

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.String(50))
    gender = db.Column(db.String(10))
    contact_number = db.Column(db.String(20))
    email = db.Column(db.String(100), unique=True)
    address = db.Column(db.String(200))
    programs = db.relationship('Program', secondary=client_program, backref=db.backref('clients', lazy=True))