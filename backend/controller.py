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
    print(username, password)
    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401
    
    
    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user)
    # return jsonify(access_token=access_token)
    response = {"access_token":access_token}
    return response


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
    questions = [{"name_question": qu.name_question, "text_question":qu.text_question, "id_question":qu.id} for qu in subject.questions.all()]
    response = jsonify({
        "questions": questions,
        "name_subject": subject.name,
    })
    return response


@app.route("/add_question_subject/<id>", methods=["POST"])
@jwt_required()
def add_question_subject(id):
    name_question = request.json['name_question']
    text_question = request.json['text_question']
    subject = Subject.query.get(id)
    question = Question(name_question, text_question, subject)
    db.session.add(question)
    db.session.commit()
    return jsonify({
        "questions": 
            {
                "name_question": question.name_question, 
                "text_question":question.text_question, 
                "id_question":question.id
            }
    })