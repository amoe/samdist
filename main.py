import flask

app = flask.Flask(__name__)

@app.route("/bag-of-words")
def hello():
    result = ["Hello, world!", 42]
    return flask.jsonify(result)
