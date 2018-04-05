import samuels_rest_server
import pytest

# You must declare a scope in order to use fixtures.
@pytest.fixture(scope='function')
def my_fixture():
    yield "foo"
    print("now inside teardown")
    

def test_can_change_corpus(my_fixture):
    result = my_fixture + "bar"
    assert result == "foobar"

