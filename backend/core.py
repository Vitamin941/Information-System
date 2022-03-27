from flask import Flask
from config import *

app = Flask(__name__)


app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY  # Change this!
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS