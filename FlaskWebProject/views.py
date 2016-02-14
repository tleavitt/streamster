# """
# Routes and views for the flask application.
# """

from datetime import datetime
from flask import render_template
from FlaskWebProject import app

# all the imports
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash

import pypyodbc

# # configuration
# DATABASE = '/tmp/streamster.db'

# def connect_db():
#     connection = pypyodbc.connect("Driver={SQL Server};Server=tcp:streamster.database.windows.net,1433;Uid=streamster@streamster;Pwd=Password1;Database=streamster")
#     return connection


# # g.db = connect_db()

# @app.before_request
# def before_request():
#     db = getattr(g, 'db', None)
#     if db is None:
#         # g.db = connect_db()
#         g.db = 'foo'

# @app.teardown_request
# def teardown_request(exception):
#     db = getattr(g, 'db', None)
#     if db is not None:
#         # db.close()
#         x = True

# @app.route('/single_video.html')
# def view_video():
# 	return render_template(
# 		'single_video.html',        
# 		title='View Video',
#         year=datetime.now().year,
# 	)

# @app.route('/')
# @app.route('/home')
# def home():
#     got_connection = "no it failed"
#     if g is not None:
#         db = getattr(g, 'db', None)
#         if db is not None:
#             got_connection = "yay it worked"

#     """Renders the home page."""
#     return render_template(
#         'index.html',
#         title='Home Page',
#         year=datetime.now().year, 
#         got_connection=got_connection
#     )

@app.route('/')
def test_db():
    connection = pypyodbc.connect("Driver={SQL Server};Server=tcp:streamster.database.windows.net,1433;Uid=streamster@streamster;Pwd=Password1;Database=streamster")
    # cursor = connection.cursor()
    # SQLCommand = ("INSERT INTO videos "
    #     "(id, timespent) "
    #     "VALUES (?, ?)")
    # Values = [3, 1234]
    # cursror.execute(SQLCommand, Values)
    # connection.commit()
    connection.close()
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year, 
    )

