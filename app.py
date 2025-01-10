import json, time

from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template("index.html");

@app.route('/notes')
def notes():
    lines = []
    with open("./test_data/test_note.txt", 'r') as file:
        lines = file.readlines()
    lines = [line.replace("\n", "")for line in lines]
    lines = json.dumps(lines)
    return render_template('string_templates_test_JS.html', notes = lines)

@app.route('/test', methods = ['GET', 'POST'])
def test(): 
    lines = []
    with open("./test_data/test_note.txt", 'r') as file:
        lines = file.readlines()
    lines = [line.replace("\n", "")for line in lines]
    lines = json.dumps(lines)
    time.sleep(5) #da simulira čekanje na frontend-u
    return jsonify({'status': 'success', 'lines':lines}), 200

if __name__ == '__main__':
    app.run()
