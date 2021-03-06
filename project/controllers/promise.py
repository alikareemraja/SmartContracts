# -*- coding: utf-8 -*-
from project import app
from flask import render_template, request, redirect, session
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import google.oauth2.credentials
import google_auth_oauthlib.flow

class CreateForm(FlaskForm):
    text = StringField('name', validators=[DataRequired()])

@app.route('/redirect', methods=['GET'])
def redirect():
    form = CreateForm(request.form)
    #request.form['email'] = session.pop('useremail', None)
    #form['email'] = session['useremail']
    #form['amount'] = session['amount']
    #form['distance'] = session['distance']
    #form['duedate'] = session['duedate']
    session['redirect'] = 1
    return render_template('startpage/index.html', form=form)


@app.route('/steps', methods=['GET', 'POST'])
def steps():
    # Use the client_secret.json file to identify the application requesting
    # authorization. The client ID (from that file) and access scopes are required.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        'client_secret.json',
        scopes=['https://www.googleapis.com/auth/fitness.activity.read',
                'https://www.googleapis.com/auth/fitness.activity.write'])

    # Indicate where the API server will redirect the user after the user completes
    # the authorization flow. The redirect URI is required.
    flow.redirect_uri = 'http://localhost:8080/redirect'

    # Generate URL for request to Google's OAuth 2.0 server.
    # Use kwargs to set optional request parameters.
    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true')
    return redirect()