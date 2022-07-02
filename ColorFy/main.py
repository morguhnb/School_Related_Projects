import os
from app import app
import urllib.request
from flask import Flask, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import ImageFiltering

ALLOWED_EXTENSIONS = set(['jpg'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
@app.route('/home')
def home():
	return render_template('home.html')

@app.route('/colorfilter')
def upload_form():
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER']) 
    return render_template('upload.html')

@app.route('/colorquiz')
def quiz():
	return render_template('quiz.html')

@app.route('/finalupload')
def output():
	return render_template('Display.html')

@app.route('/filteredImage', methods=['GET', 'POST']) #This is where images are uploaded
def upload_image():
    #gonna be real, not sure what this block accomplishes yet, but its necessary
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']

     #Checking if file is blank
    if file.filename == '':
        flash('No image selected for uploading')
        return render_template('uploadError.html')

    #if the file is one of the allowed types
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        filename = "static/uploads/" + str(filename)
        filtertype = request.form.get('filters')

        prev_fname = str(file.filename[:-4])
        new_filename = "static/uploads/" + prev_fname + "_filtered.jpg"
        filter(filename, new_filename, filtertype)
        return render_template('Display.html', user_Image=(filename), new_Image = (new_filename))
    else:
        flash('Only allow for .jpg files')
        return render_template('uploadError2.html')

def filter(filename, new_filename, filterType):
	if filterType == "r-w" or filterType == "r-b" or filterType == "g-w" or filterType == "g-b":
		ImageFiltering.RedGreen.filter(filename, new_filename, filterType)

if __name__ == "__main__":
    app.run()