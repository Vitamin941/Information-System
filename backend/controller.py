from urllib import response
from core import app
from model import *

from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies


jwt = JWTManager(app)

# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401
    
    
    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user)
    # return jsonify(access_token=access_token)
    response = {"access_token":access_token}
    return response


@app.route("/signup", methods=["POST"])
def signup():
    username = request.json.get("username", None)
    fullname = request.json.get("fullname", None)
    password = request.json.get("password", None)

    user = db.session.query(User).filter_by(username=username).first()
    if not user:
        user = User(full_name=fullname, username=username, password=password)
        db.session.add(user)
        db.session.commit()
    else:
        return jsonify("A user with this name exists"), 401

    return jsonify("Вы удачно зарегестрировались!"), 200


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/me", methods=["GET"])
@jwt_required()
def protected():
    # We can now access our sqlalchemy User object via `current_user`.
    response = jsonify({
        "id":current_user.id,
        "full_name":current_user.full_name,
        "username":current_user.username,
    })
    return response


@app.route("/get_subject", methods=["GET"])
@jwt_required()
def subject():
    subjects = [{"subject_name": sbjct.name, "subject_id":sbjct.id} for sbjct in Subject.query.all()]
    response = jsonify({
        "subject": subjects,
    })
    return response

@app.route("/get_question_subject/<id>", methods=["GET"])
@jwt_required()
def question_subject(id):
    subject = Subject.query.get(id)
    user_id = current_user.id
    rep = db.session.query(Repetition).filter(Repetition.user_id == user_id).all()
    questions = [{
        "text":Question.query.get(qu.question_id).text_question,
        "level": qu.level,
        "id":qu.question_id} for qu in rep]
    response = jsonify({
        "questions": questions
    })
    return response


@app.route("/add_question", methods=["POST"])
@jwt_required()
def add_question_subject():
    id = request.json['id_subject']
    text_question = request.json['text']
    text_answer = request.json['answer']
    img = request.json['photo']
    subject = Subject.query.get(id)
    question = Question(text_question, subject, text_answer, img)
    db.session.add(question)
    db.session.commit()
    return jsonify({
        "id":question.id
    })

@app.route("/delete_question/<id>", methods=["POST"])
@jwt_required()
def delete_question(id):
    question = Question.query.get(id)
    db.session.delete(question)
    db.session.commit()
    response = jsonify({
        "status":"OK"
    })
    return response

@app.route("/update_question/<id>", methods=["POST"])
@jwt_required()
def гupdate_question(id):
    question = Question.query.get(id)
    question.text_question = request.json['text'] 
    question.text_answer = request.json['answer']
    question.image = request.json['photo']
    db.session.commit()
    response = jsonify({
        "status":"OK"
    })
    return response

@app.route("/get_answer/<id>", methods=["GET"])
@jwt_required()
def get_answer(id):
    quation = Question.query.get(id)
    response = jsonify({
        "answer": quation.text_answer,
        "photo": quation.image
    })
    return response