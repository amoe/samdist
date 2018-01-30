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
def massage_stats_output(data):
    return [[x[0], x[1].item()] for x in data]

@app.route("/find-tags")
def find_tags():
    field = flask.request.args.get('field')
    word = flask.request.args.get('word')

    # validation etc

    result = fnonl.find_tags(word, field=field)

    return flask.jsonify(massage_stats_output(result))
    

@app.route("/display-selected")
def display_selected():
    field = flask.request.args.get('field')
    value = flask.request.args.get('value')
    window = int(flask.request.args.get('window'))
    word = flask.request.args.get('word')

    # Execute this for its side effects, because display_selected() uses the
    # previously computed find list.
    fnonl.find_tags(word, field=field)
    result = fnonl.display_selected(field=field, value=value, window=window)
    return flask.jsonify(result)

# This is a novelty, basically wrap the operation.
@app.route("/find-text-by-semantic-tag")
def find_text_by_semantic_tag():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')
    field = flask.request.args.get('field')
    value = flask.request.args.get('value')
    window = int(flask.request.args.get('window'))
    cutoff = int(flask.request.args.get('cutoff'))


    # We throw away the word stats result of find_text.
    fnonl.find_text(tag_match, field=tag_field)
    result = fnonl.display_selected(
        field=field, value=value, window=window, cutoff=cutoff
    )

    return flask.jsonify(result)

@app.route("/get-top-features")
def find_words_by_semantic_tag():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')
    relation = flask.request.args.get('relation')
    window = int(flask.request.args.get('window'))
    cutoff = int(flask.request.args.get('cutoff'))

    result = fnonl.get_top_features(
        tag_match, field=tag_field, cutoff=cutoff, window=window, rel=relation
    )

    return flask.jsonify(result)
