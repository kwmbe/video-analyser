import os
import uuid as u

from flask          import Flask, request, abort, Response, send_from_directory
from flask_cors     import CORS
from json           import dumps
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)
app.secret_key = u.uuid4().hex
app.config['UPLOAD_FOLDER'] = './uploads/'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['mp4']

def uploaded_files():
    return [x for x in os.listdir(app.config['UPLOAD_FOLDER']) if not x.endswith('.mp4')]

@app.route('/')
def test():
    return uploaded_files()

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return abort(Response(dumps({'error': 'No file selected'}), 400))
    file = request.files['file']
    if file.filename == '':
        return abort(Response(dumps({'error': 'File name is empty'}), 400))
    if not allowed_file(file.filename):
        return abort(Response(dumps({'error': 'Wrong file extension'}), 415))
    filename = u.uuid4().hex + '.mp4'
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return uploaded_files()

@app.route('/delete/<path:id>', methods=['DELETE'])
def delete(id):
    file = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(id))
    if os.path.exists(file):
        os.remove(file)
        return uploaded_files()
    return abort(Response(dumps({'error': 'File not found'}), 404))

@app.route('/video/<path:id>')
def video(id):
    if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(id))):
        return send_from_directory(app.config['UPLOAD_FOLDER'], secure_filename(id))
    return abort(Response(dumps({'error': 'File not found'}), 404))

