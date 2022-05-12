from distutils.log import debug
from core import app
from model import *
from controller import *
import os 
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024
app.config['UPLOAD_PATH'] = 'IMAGE'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'IMAGE\\')

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)