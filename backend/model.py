from core import app

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

from werkzeug.security import generate_password_hash,  check_password_hash

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    full_name = db.Column(db.Text, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def __init__(self, username, full_name, password):
        self.username = username
        self.full_name = full_name
        self.set_password(password)
    # NOTE: In a real application make sure to properly hash and salt passwords
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text_question = db.Column(db.Text)
    text_answer = db.Column(db.Text)
    image = db.Column(db.Text)

    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))
    subject = db.relationship('Subject',
        backref=db.backref('questions', lazy='dynamic'))

    def __init__(self, text_question, subject, text_answer='', image=None):
        self.text_question = text_question
        self.subject = subject
        self.text_answer = text_answer
        self.image = image

    def __repr__(self):
        return '<Question %r>' % self.text_question

class Repetition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    question = db.relationship('Question',
        backref=db.backref('question', lazy='dynamic'))
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User',
        backref=db.backref('repets', lazy='dynamic'))

    time_repetition = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    level = db.Column(db.Integer)

    def __init__(self, question, user, level):
        self.question = question
        self.user = user
        self.level = level

    def __repr__(self):
        return f'<Repetition {self.question_id} ({self.user.username})>'


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User',
        backref=db.backref('subjects', lazy='dynamic'))

    def __init__(self, name, user):
        self.name = name
        self.user = user

    def __repr__(self):
        return f'<Subject {self.name} ({self.user.username})>'