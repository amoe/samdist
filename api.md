# API documentation

## PUT /configuration/corpus

Send a JSON-encoded string, for instance the data `"mnonl"`.  This will switch
the corpus that's used by the current singleton Viewer.

You're going to get a 500 if it's not a valid corpus string, probably.
