import imp
import os
from backend.app import db 
dir = os.path.abspath(__file__)

os.system("npm install react-router-dom@6.2.2 --save")
os.system("npm install concurrently@7.0.0 --save")
os.system("backend\\env\\Scripts\\python.exe -m pip install --upgrade pip")
os.system("backend\\env\\Scripts\\python.exe -m pip install -r backend\\lib.txt")


db.create_all()
#db.session.add(User(full_name="Bruce Wayne", username="batman"))
#db.session.add(User(full_name="Ann Takamaki", username="panther"))
#db.session.add(User(full_name="Jester Lavore", username="little_sapphire"))
#db.session.commit()