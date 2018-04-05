import samuels_rest_server
import pytest
import json

def test_can_change_corpus():
    client = samuels_rest_server.app.test_client()
    result = client.put(path="/configuration/corpus", data={})
    data = json.loads(result.get_data(as_text=True))
    assert data == {}

