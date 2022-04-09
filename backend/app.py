from core import app
from model import *
from controller import *

if __name__ == "__main__":
    db.create_all()
    app.run()