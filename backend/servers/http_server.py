from imports_servers import *
from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/')
def index():
    return 'Index Page'


@app.route('/get_data_user/', methods=["POST"])
def get_data_user():
    response = request.get_json()
    return retrieve_user_data(response["uid"])


@app.route('/delete_account/', methods=["POST"])
def delete_account():
    response = request.get_json()
    disable_account(response["uid"])
    return 'OK'


@app.route('/create_auth/', methods=["POST"])
def create_auth():
    response = request.get_json()
    return create_new_auth(response)


@app.route('/create_auth_github/', methods=["POST"])
def create_auth_github():
    response = request.get_json()
    return create_new_auth_github(response)


@app.route('/edit_user/', methods=["POST"])
def edit_user():
    response = request.get_json()
    return edit_user_routine(response)


@app.route('/get_courses_and_exercises/', methods=["POST"])
def get_courses():
    return retreive_all_courses_and_exercises()


@app.route('/get_courses_manager/<uid>/', methods=["POST"])
def get_courses_manager(uid):
    return retreive_courses_and_exercises_by_uid(uid)


@app.route('/create_course/', methods=["POST"])
def create_course():
    response = request.get_json()
    create_new_course(response)
    return 'OK'


@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)
