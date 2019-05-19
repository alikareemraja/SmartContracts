# -*- coding: utf-8 -*-
from project import app
from flask import render_template, request, session
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateForm(FlaskForm):
    text = StringField('name', validators=[DataRequired()])


# @app.route('/')
# def start():
#     return render_template('printer/index.html')


@app.route('/print', methods=['GET', 'POST'])
def printer():
    form = CreateForm(request.form)
    if request.method == 'POST' and form.validate():
        from project.models.Printer import Printer
        printer = Printer()
        printer.show_string(form.text.data)
        return render_template('printer/index.html')
    return render_template('printer/print.html', form=form)


@app.route('/', methods=['GET', 'POST'])
def startpage():
    session['useremail'] = ''
    session['amount'] = 100
    session['distance'] = 12
    session['duedate'] = 4
    session['redirect'] = 0
    return render_template('startpage/index.html')
