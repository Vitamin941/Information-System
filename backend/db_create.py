from app import db, User, Subject, Question
# dir = os.path.abspath(__file__)

db.create_all()
db.session.add(User(full_name="Bruce Wayne", username="batman"))
db.session.add(User(full_name="Ann Takamaki", username="panther"))
db.session.add(User(full_name="Jester Lavore", username="little_sapphire"))

subject_1 = Subject("Группа вопросов 1")
question_1 = Question("Java vs Python", "Зачем учить Python если можно кодить на Java?", subject_1)
db.session.add(subject_1)
db.session.add(question_1)

db.session.commit()


