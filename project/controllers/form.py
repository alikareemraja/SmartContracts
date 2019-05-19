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



@app.route('/form', methods=['GET', 'POST'])
def form():
    form = CreateForm(request.form)
    if request.method == 'POST' and form.validate():
        from project.models.Printer import Printer
        printer = Printer()
        printer.show_string(form.text.data)
        return render_template('printer/index.html')
    return render_template('form/form.html', form=form)




@app.route('/oauth', methods=['GET'])
def oauth():


    # Use the client_secret.json file to identify the application requesting
    # authorization. The client ID (from that file) and access scopes are required.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        'client_secret.json',
        scopes=['https://www.googleapis.com/auth/fitness.activity.read'])

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

    return redirect(authorization_url)

