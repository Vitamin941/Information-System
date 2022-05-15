from core import app
from model import *
from datetime import datetime, timedelta
from sqlalchemy import and_
import os, random
from flask import jsonify, send_file

from flask import send_from_directory
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies

# ================ Настройка JWT ==============================================
jwt = JWTManager(app)


# Как получить id пользователя
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


# Получение пользователя из БД
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


# ============= Получение картинок ============================================
@app.route("/uploads/<path:name>")
def download_file(name):
    return send_from_directory(
        app.config['UPLOAD_FOLDER'], name, as_attachment=True
        )


# ============= Авторизация и регистрация =====================================
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).one_or_none()

    # Проверка данных
    if not user or not user.check_password(password): 
        return jsonify("Wrong username or password"), 401
    
    # Токен
    access_token = create_access_token(identity=user)

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
        return jsonify("Пользователь с таким именем (ником) существует"), 401

    return jsonify("Вы удачно зарегестрировались!"), 200


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# ================== Данные пользователя ======================================
@app.route("/me", methods=["GET"])
@jwt_required()
def protected():
    response = jsonify({
        "id":current_user.id,
        "full_name":current_user.full_name,
        "username":current_user.username,
    })
    return response


# ============ Категории вопросов =============================================
@app.route("/get_subject", methods=["GET"])
@jwt_required()
def subject():
    user_id = current_user.id
    subjects_repit = db.engine.execute(f"""
        select s.id, s.name  from repetition as r  
        join question as q on q.id = r.question_id
        join subject as s on s.id = q.subject_id
        where r.user_id = {user_id} union 
        select s2.id, s2.name from subject as s2 where s2.user_id = {user_id}
    """).all()
    subjects = [
        {"subject_name": sbjct[1], "subject_id":sbjct[0]}
        for sbjct in subjects_repit
        ]
    response = jsonify({
        "subject": subjects,
    })
    return response

@app.route("/add_subject", methods=["POST"])
@jwt_required()
def add_subject():
    name_subject = request.json['name_subject']
    user = current_user
    subject_new = Subject(name_subject, user)
    db.session.add(subject_new)
    db.session.commit()
    return jsonify({
        "status": "OK",
        "id":subject_new.id
    })

@app.route("/delete_subject/<id>", methods=["POST"])
@jwt_required()
def delete_subject(id):
    user = current_user
    db.engine.execute(f"""
        delete from repetition where id in (select r.id from repetition as r 
        join question as q on q.id = r.question_id 
        where q.subject_id = {id} and r.user_id = {user.id})
    """)
    subject = Subject.query.get(id)
    if subject.user == user:
        db.engine.execute(f"""
        delete from repetition where id in (select r.id from repetition as r 
        join question as q on q.id = r.question_id 
        where q.subject_id = {id})
    """)
        db.session.delete(subject)

    db.session.commit()
    return jsonify({
        "status": "OK",
    })

# ============== Вопросы и повторения =========================================
@app.route("/get_question_subject/<id>", methods=["GET"])
@jwt_required()
def question_subject(id):
    user_id = current_user.id
    questions_ = db.engine.execute(f"""
        select q.text_question, r.level, q.id from repetition as r 
        join question as q on q.id = r.question_id 
        where q.subject_id = {id} and r.user_id = {user_id}
    """).all()
    questions = [{ 
                    "text":qu[0],
                    "level": qu[1],
                    "id":qu[2]
                } for qu in questions_]
            
    return jsonify({
        "questions": questions
    })

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
    rep = Repetition(question, current_user, 0)
    db.session.add(rep)
    db.session.commit()
    return jsonify({
        "id":question.id
    })

@app.route("/delete_question/<id>", methods=["POST"])
@jwt_required()
def delete_question(id):
    # question = Question.query.get(id)
    rep = Repetition.query.filter(
        Repetition.question_id == id and 
        Repetition.user_id == current_user.id
        )[0]
    db.session.delete(rep)
    # db.session.delete(question) #НАДО ЧТО-ТО ПРИДУМАТЬ С
    db.session.commit()
    response = jsonify({
        "status":"OK"
    })
    return response

@app.route("/update_question/<id>", methods=["POST"])
@jwt_required()
def update_question(id):
    question = Question.query.get(id)
    question.text_question = request.json['text'] 
    question.text_answer = request.json['answer']
    db.session.commit()
    response = jsonify({
        "status": "OK"
    })
    return response

@app.route("/update_question_image/<id>", methods=["POST"])
@jwt_required()
def update_question_image(id):
    uploaded_file = request.files['image']
    question = Question.query.get(id)
    hash = random.getrandbits(128)
    ext = uploaded_file.filename.split('.')[-1]
    path = '%s.%s' % (hash, ext)
    if path != question.image:
        question.image =  path
        db.session.commit()
        uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], path))
    
    response = jsonify({
        "status": 'ok'
    })
    return response

@app.route("/get_answer/<id>", methods=["GET"])
@jwt_required()
def get_answer(id):
    question = Question.query.get(id)
    response = jsonify({
        "answer": question.text_answer,
        "photo": question.image
    })
    return response

@app.route("/get_answer_image/<id>", methods=["GET"])
@jwt_required()
def get_answer_image(id):
    question = Question.query.get(id)
    target=os.path.join(os.getcwd(),'IMAGE')
    file = os.path.join(target,question.image)
    safe_path = send_file(file, as_attachment=True)
    return safe_path

# ================= Повторение вопросов =======================================

TIMES_LEVEL = [
    timedelta(seconds=30),
    timedelta(minutes=20),
    timedelta(hours=8),
    timedelta(days=1),
    timedelta(weeks=1),
    timedelta(weeks=3),
]


@app.route("/get_repit_quastion", methods=["GET"])
@jwt_required()
def get_repit_quastion():
    user_id = current_user.id
    rep = db.session.query(Repetition).filter(
        and_(Repetition.user_id == user_id, Repetition.time_repetition < datetime.now())
        )
    rep_sort = rep.order_by(Repetition.time_repetition.asc()).limit(1).all()
    if len(rep_sort) == 0:
        status = "Повторять нечего"
        question = []
    else:
        status = "OK"
        question = [{
            "text":Question.query.get(qu.question_id).text_question,
            "level": qu.level,
            "id":qu.question_id,
            "rep_id":qu.id
        } for qu in rep_sort]
    
    return jsonify({
        "question": question,
        "status": status
    })

@app.route("/correctly_answered_quastion/<id>", methods=["POST"])
@jwt_required()
def correctly_answered(id):
    rep = Repetition.query.get(id) 
    level = rep.level
    if level < 5:
        level += 1
    rep.time_repetition = datetime.now() + TIMES_LEVEL[level]
    rep.level = level
    db.session.commit()
    response = jsonify({
        "status":"OK"
    })
    return response


@app.route("/wrong_answered_quastion/<id>", methods=["POST"])
@jwt_required()
def wrong_answered(id):
    rep = Repetition.query.get(id)
    level = 0
    rep.time_repetition = datetime.now() + TIMES_LEVEL[level]
    rep.level = level
    db.session.commit()
    response = jsonify({
        "status":"OK"
    })
    return response


# ============= Отправка вопроса пользователю =================================
@app.route("/get_user_id/<name>", methods=["GET"])
@jwt_required()
def get_user_id(name):
    user = User.query.filter_by(username=name).one_or_none()
    if not user:
        response = jsonify({
            "exis": False 
        })
    else:
        response = jsonify({
            "exis": True, 
            "user_id": user.id,
            "user_name": user.full_name
        })
    return response


@app.route("/send_subject/<subject_id>/user/<user_id>", methods=["POST"])
@jwt_required()
def send_subject_user(subject_id, user_id):
    msg_subject = Subject.query.get(subject_id).questions
    user = User.query.get(user_id)

    for qu in msg_subject:
        rep = Repetition(qu, user, 0)
        db.session.add(rep)
    db.session.commit()

    return jsonify({
        "status": "OK",
    })