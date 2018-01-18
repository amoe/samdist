# demo script

import SamuelsCorpus
import matplotlib

input_path = 'intermediate_data/f_nonl'

# This is actually going to load a bunch of files with defined suffixes:
# _combined, _rel, _coocurrence, _coocurrence_byrel

fnonl = SamuelsCorpus.Viewer(input_path, colors=['r'])

# bow = bag-of-words
fnonl_tagbag = fnonl.make_bow(field='SEMTAG3', cutoff=10, displaygraph=True)

matplotlib.pyplot.show()
