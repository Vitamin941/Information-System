import os

os.system("npm install react-router-dom@6.2.2 --save")
os.system("npm install concurrently@7.0.0 --save")
os.system("backend\\env\\Scripts\\python.exe -m pip install --upgrade pip")
os.system("backend\\env\\Scripts\\python.exe -m pip install -r backend\\lib.txt")
os.system("backend\\env\\Scripts\\python.exe  backend\\db_create.py")
