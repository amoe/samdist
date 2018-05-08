import flask
import SamuelsCorpus
import pprint
import resthelper

prefix = 'intermediate_data/'
default_corpus = 'mnonl'

# This is actually going to load a bunch of files with defined suffixes:
# _combined, _rel, _coocurrence, _coocurrence_byrel

available_corpora = {
    'fnonl': prefix + 'f_nonl',
    'mnonl': prefix + 'm_nonl'
}

# used by `compare_corpora`
comparator = SamuelsCorpus.Comparator(available_corpora)

def get_input_path(corpora_name):
    return available_corpora[corpora_name]

def create_app():
    app = flask.Flask(__name__)
    app.viewer = SamuelsCorpus.Viewer(get_input_path(default_corpus), colors=['r'])
    app.current_corpus = default_corpus
    return app

app = create_app()

@app.route('/configuration/corpus', methods=['PUT'])
def change_corpus():
    print("Reinitializing corpus")
    content = flask.request.get_json()
    print("Found content as '%s'" % content)
    flask.current_app.viewer = SamuelsCorpus.Viewer(
        get_input_path(content), colors=['r']
    )
    flask.current_app.current_corpus = content
    return ('', 204)

@app.route('/configuration/corpus', methods=['GET'])
def get_corpus():
    return flask.jsonify(flask.current_app.current_corpus)


@app.route("/available-corpora")
def get_available_corpora():
    return flask.jsonify(list(available_corpora.keys()))

@app.route("/bag-of-words")
def bag_of_words():
    field = flask.request.args.get('field')
    cutoff = int(flask.request.args.get('cutoff'))   # typed as string

    corpus_size, candidates = flask.current_app.viewer.make_bow(
        field=field, cutoff=cutoff, displaygraph=False
    )

    # SamuelsCorpus.py doesn't implement its own cutoff, so we must do it here.

    return flask.jsonify(candidates[:cutoff])


@app.route("/find-tags")
def find_tags():
    field = flask.request.args.get('field')
    word = flask.request.args.get('word')

    # validation etc

    result = flask.current_app.viewer.find_tags(word, field=field)

    pprint.pprint(result)

    return flask.jsonify(resthelper.massage_stats_output(result))
    

@app.route("/display-examples-by-word")
def display_examples_by_word():
    field = flask.request.args.get('field')
    value = flask.request.args.get('value')
    window = int(flask.request.args.get('window'))
    word = flask.request.args.get('word')

    # Execute this for its side effects, because display_selected() uses the
    # previously computed find list.
    flask.current_app.viewer.find_tags(word, field=field)
    result = flask.current_app.viewer.display_selected(field=field, value=value, window=window)

    formatted_result = list(map(lambda x: [x], result))
    return flask.jsonify(formatted_result)

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
    flask.current_app.viewer.find_text(tag_match, field=tag_field)
    result = flask.current_app.viewer.display_selected(
        field=field, value=value, window=window, cutoff=cutoff
    )

    # munge it into the 2d array format expected by the TableWidget
    formatted_result = list(map(lambda x: [x], result))

    return flask.jsonify(formatted_result)


@app.route("/find-words-by-semantic-tag")
def find_words_by_semantic_tag():
    tag_match = flask.request.args.get('tag_match')
    tag_field = flask.request.args.get('tag_field')

    # This time we return the results, which are useful stats.
    result = flask.current_app.viewer.find_text(tag_match, field=tag_field)

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
        flask.current_app.viewer,
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

    result = flask.current_app.viewer.get_top_relations(
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
        flask.current_app.viewer,
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
        [helper.format_line(candidate)]
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
        flask.current_app.viewer,
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

    result = flask.current_app.viewer.find_similarity(semtag_a, semtag_b, relation)
    return flask.jsonify([[result]])


@app.route("/find-nearest-neighbours")
def find_nearest_neighbour():
    tag_match = flask.request.args.get('tag_match')
    relation = flask.request.args.get('relation')

    result = flask.current_app.viewer.find_knn(tag_match, relation)
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

    return flask.jsonify(result[:cutoff])
