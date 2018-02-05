import flask
import SamuelsCorpus
import pprint
import resthelper

app = flask.Flask(__name__)

prefix = 'intermediate_data/'

input_path = prefix + '/f_nonl'

# This is actually going to load a bunch of files with defined suffixes:
# _combined, _rel, _coocurrence, _coocurrence_byrel

available_corpora = {
    'fnonl': prefix + 'f_nonl',
    'mnonl': prefix + 'm_nonl'
}

# used by `compare_corpora`
comparator = SamuelsCorpus.Comparator(available_corpora)

fnonl = SamuelsCorpus.Viewer(input_path, colors=['r'])

# bow = bag-of-words


@app.route("/bag-of-words")
def bag_of_words():
    field = flask.request.args.get('field')
    cutoff = int(flask.request.args.get('cutoff'))   # typed as string

    corpus_size, candidates = fnonl.make_bow(
        field=field, cutoff=cutoff, displaygraph=False
    )

    # SamuelsCorpus.py doesn't implement its own cutoff, so we must do it here.

    return flask.jsonify(candidates[:cutoff])


@app.route("/find-tags")
def find_tags():
    field = flask.request.args.get('field')
    word = flask.request.args.get('word')

    # validation etc

    result = fnonl.find_tags(word, field=field)

    return flask.jsonify(resthelper.massage_stats_output(result))
    

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


@app.route("/find-words-by-semantic-tag")
def find_words_by_semantic_tag():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')

    # This time we return the results, which are useful stats.
    result = fnonl.find_text(tag_match, field=tag_field)

    return flask.jsonify(resthelper.massage_stats_output(result))


@app.route("/get-top-features")
def get_top_features():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')
    relation = flask.request.args.get('relation')
    window = int(flask.request.args.get('window'))
    cutoff = int(flask.request.args.get('cutoff'))

    # We need a special helper here because the SamuelsCorpus API is a bit
    # strange

    # Constructor encapsulates the entire query
    helper = resthelper.CooccurrenceHelper(
        fnonl,
        tag_match,
        relation,
        cutoff,
        tag_field,
        False,   # display (??)
        0,      # examples
        window
    )

    candidates = helper.query_top_features()
    return flask.jsonify(candidates)

@app.route("/get-top-relations")
def get_top_relations():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')
    cutoff = int(flask.request.args.get('cutoff'))

    result = fnonl.get_top_relations(
        tag_match, cutoff=cutoff, field=tag_field, displaygraph=False
    )

    return flask.jsonify(result)



@app.route("/get-cooccurrence-candidate-texts")
def get_cooccurrence_candidate_texts():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')
    relation = flask.request.args.get('relation')
    window = int(flask.request.args.get('window'))
    cutoff = int(flask.request.args.get('cutoff'))

    # We need a special helper here because the SamuelsCorpus API is a bit
    # strange

    # Constructor encapsulates the entire query
    helper = resthelper.CooccurrenceHelper(
        fnonl,
        tag_match,
        relation,
        cutoff,
        tag_field,
        False,   # display (??)
        3,      # examples
        window
    )
    candidates = helper.query_top_features()

    feature_lines = [
        helper.format_line(candidate)
        for candidate in candidates
    ]

    return flask.jsonify(feature_lines)


@app.route("/get-cooccurrence-examples")
def get_cooccurrence_examples():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')
    relation = flask.request.args.get('relation')
    window = int(flask.request.args.get('window'))
    cutoff = int(flask.request.args.get('cutoff'))
    examples = int(flask.request.args.get('examples'))

    # Constructor encapsulates the entire query
    helper = resthelper.CooccurrenceHelper(
        fnonl,
        tag_match,
        relation,
        cutoff,
        tag_field,
        False,   # display (??)
        examples,      # examples
        window
    )

    candidates = helper.query_top_features()
    examples = helper.get_examples_for_all_candidates(candidates)
    return flask.jsonify(examples)

@app.route("/find-similarity")
def find_similarity():
    semtag_a = flask.request.args.get('semtag_a')
    semtag_b = flask.request.args.get('semtag_b')
    relation = flask.request.args.get('relation')

    print("relation is '%s'" % relation)

    result = fnonl.find_similarity(semtag_a, semtag_b, relation)
    pprint.pprint(result)
    return flask.jsonify(result)


@app.route("/find-nearest-neighbours")
def find_nearest_neighbour():
    tag_match = flask.request.args.get('tag_match')
    relation = flask.request.args.get('relation')

    result = fnonl.find_knn(tag_match, relation)
    pprint.pprint(result)
    return flask.jsonify(result)

@app.route("/compare-corpora")
def compare_corpora():
    corpus_key = flask.request.args.get('corpus_key')
    measure = flask.request.args.get('measure')
    field = flask.request.args.get('field')
    cutoff = int(flask.request.args.get('cutoff'))

    result = comparator.compute_surprises(
        corpus_key, measure=measure, field=field, cutoff=cutoff
    )

    return flask.jsonify(result)
