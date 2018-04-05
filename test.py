import samuels_rest_server
import pytest
import json

def test_can_change_corpus():
    client = samuels_rest_server.app.test_client()
    result = client.put(
        path="/configuration/corpus",
        data=json.dumps('mnonl'),
        content_type="application/json"   # Required to pass this
    )
    assert result.status_code == 204

def test_can_list_corpora():
    client = samuels_rest_server.app.test_client()
    result = client.get(
        path="/available-corpora",
    )
    
    data = json.loads(result.get_data(as_text=True))
    assert data == ['fnonl', 'mnonl']


def test_can_get_current_corpus():
    client = samuels_rest_server.app.test_client()
    result = client.get(
        path="/configuration/corpus",
    )
    assert result.status_code == 200


# def test_current_corpus_value_is_accurate():
#     client = samuels_rest_server.app.test_client()
#     result = client.get(
#         path="/configuration/corpus",
#     )
#     data = json.loads(result.get_data(as_text=True))
#     assert data == 'fnonl'
