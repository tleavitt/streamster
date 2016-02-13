"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from FlaskWebProject import app

# all the imports
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash

# configuration
DATABASE = '/tmp/streamster.db'

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

@app.route('/single_video.html')
def view_video():
	return render_template(
		'single_video.html',        
		title='View Video',
        year=datetime.now().year,
	)

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )
