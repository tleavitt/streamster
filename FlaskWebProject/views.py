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
import pypyodbc

# configuration
DATABASE = '/tmp/streamster.db'

def connect_db():
    # connection = pypyodbc.connect('Driver={SQL Server};',
                                # 'Server=streamster.database.windows.net;',
                                # 'Database=streamster;',
                                # 'uid=sa;pwd=Password1') 
    connection = pypyodbc.connect("DRIVER={SQL Server};SERVER=streamster.database.windows.net;UID=sa;PWD=Password1;DATABASE=streamster")
    return connection


# g.db = connect_db()

@app.before_request
def before_request():
    db = getattr(g, 'db', None)
    if db is None:
        g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

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
    db = getattr(g, 'db', None)
    if db is not None:
        got_connection = "yay it worked"
    else:
        got_connection = "no it failed"
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year, 
        got_connection=got_connection
    )
