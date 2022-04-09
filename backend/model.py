from core import app

from hmac import compare_digest
from datetime import datetime
from selectors import SelectorKey
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    full_name = db.Column(db.Text, nullable=False)

    # NOTE: In a real application make sure to properly hash and salt passwords
    def check_password(self, password):
        return compare_digest(password, "password")

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_question = db.Column(db.String(80))
    text_question = db.Column(db.Text)
    text_answer = db.Column(db.Text)

    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))
    subject = db.relationship('Subject',
        backref=db.backref('questions', lazy='dynamic'))

    def __init__(self, name_question, text_question, subject, text_answer=''):
        self.name_question = name_question
        self.text_question = text_question
        self.subject = subject
        self.text_answer = text_answer

    def __repr__(self):
        return '<Question %r>' % self.name_question

class Repetition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    question = db.relationship('Question',
        backref=db.backref('question', lazy='dynamic'))
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User',
        backref=db.backref('users', lazy='dynamic'))

    time_repetition = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    level = db.Column(db.Integer)

    def __init__(self, question, user, subject, level):
        self.question = question
        self.user = user
        self.subject = subject
        self.level = level

    def __repr__(self):
        return f'<Repetition {self.question_id} ({self.user.username})>'


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Subject %r>' % self.name