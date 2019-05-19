FROM python:3

COPY . /app
WORKDIR /app

RUN pip install --no-cache-dir -Ur requirements.txt

EXPOSE 80
CMD exec gunicorn runserver:app --bind 0.0.0.0:80 --workers 3

