import json

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/notes')
def notes():
    lines = []
    with open("./test_data/test_note.txt", 'r') as file:
        lines = file.readlines()
    lines = [line.replace("\n", "")for line in lines]
    lines = json.dumps(lines)
    return render_template('string_templates_test_JS.html', notes = lines)

if __name__ == '__main__':
    app.run()
