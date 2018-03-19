Software to explore distributions of concepts (as defined by the Samuels Tagger) .

Core functionality is stored in SamuelsCorpus.py (which calls on functions in
CharacterisingFunctions to determine distinguishing concepts)

SamuelsProcessor.ipynb is the interface which should be run first just once -
this will add grammatical annotations (using Spacy) to the Samuels output,
extract co-occurrence features and compute PPMI.

SamuelsViewer.ipynb relies on the results of the Processor, but can be used to
explore distributions of concepts in a single corpus or across corpora.

## Operations

Run tests: `yarn test`

## Versions

Pinned at Flask 0.12.1-1

## Required stuff

* Flask
* Pandas
* Spacy (from pip - not in Debian)
* Node v8+ (used to provide `const` without babel)

Yow! x2
