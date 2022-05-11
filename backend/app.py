from distutils.log import debug
from core import app
from model import *
from controller import *

app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024
app.config['UPLOAD_PATH'] = 'IMAGE'
app.config['UPLOAD_FOLDER'] = 'C:\\Users\\danii\\python\\project\\infsys\\Information-System\\IMAGE\\'

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)