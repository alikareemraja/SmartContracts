# -*- coding: utf-8 -*-
from project import app
from flask import render_template, request, redirect
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import google.oauth2.credentials
import google_auth_oauthlib.flow

class CreateForm(FlaskForm):
    text = StringField('name', validators=[DataRequired()])

@app.route('/redirect', methods=['GET', 'POST'])
def redirect():
    form = CreateForm(request.form)
    return render_template('printer/index.html', form=form)