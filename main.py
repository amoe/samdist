import flask
import SamuelsCorpus

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

@app.route("/find-tags")
def find_tags():
    field = flask.request.args.get('field')
    cutoff = flask.request.args.get('word')
    result = {}
    return flask.jsonify(result)
    
