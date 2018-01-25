import flask
import SamuelsCorpus
import pprint

app = flask.Flask(__name__)

input_path = 'intermediate_data/f_nonl'
# This is actually going to load a bunch of files with defined suffixes:
# _combined, _rel, _coocurrence, _coocurrence_byrel

fnonl = SamuelsCorpus.Viewer(input_path, colors=['r'])

# bow = bag-of-words


@app.route("/bag-of-words")
def bag_of_words():
    field = flask.request.args.get('field')
    cutoff = flask.request.args.get('cutoff')   # typed as string
    fnonl_tagbag = fnonl.make_bow(field='SEMTAG3', cutoff=10, displaygraph=False)
    return flask.jsonify(fnonl_tagbag)

# Remove the numpy wrapper and convert to raw python int
def massage_find_tags_output(data):
    return [[x[0], x[1].item()] for x in data]

@app.route("/find-tags")
def find_tags():
    field = flask.request.args.get('field')
    word = flask.request.args.get('word')

    # validation etc

    result = fnonl.find_tags(word, field=field)

    return flask.jsonify(massage_find_tags_output(result))
    
