from app import db, User, Subject, Question, Repetition
# dir = os.path.abspath(__file__)

db.create_all()
admin = db.session.query(User).filter_by(username="admin").first()
if not admin:
    admin = User(full_name="Admin min", username="admin", password="password")
    db.session.add(admin)

subject_1 = db.session.query(Subject).filter_by(name="Группа вопросов 1").first()
if not subject_1:
    subject_1 = Subject("Группа вопросов 1")
    db.session.add(subject_1)

question_1 = db.session.query(Question).filter_by(text_question="Зачем учить Python если можно кодить на Java?").first()
if not question_1:
    question_1 = Question("Зачем учить Python если можно кодить на Java?", subject_1, 'Ответ')
    db.session.add(question_1)

rep_1 = db.session.query(Repetition).filter_by(question=question_1, user=admin).first()
if not rep_1:
    rep_1 = Repetition(question_1, admin, subject_1, 2)
    db.session.add(rep_1)

db.session.commit()


