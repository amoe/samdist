# resthelper.py

def massage_stats_output(data):
    # Remove the numpy wrapper and convert to raw python int
    return [[x[0], x[1].item()] for x in data]



# Because samuelscorpus just writes its outputs directly to stdout inside, we
# need to reimplement some of the functionality here in order to capture it.
class CooccurrenceHelper(object):
    def __init__(self, viewer, key, rel, cutoff, field, display, examples, window):
        self.viewer = viewer
        self.key = key
        self.rel = rel
        self.cutoff = cutoff
        self.field = field
        self.display = display
        self.examples = examples
        self.window = window


    def query_top_features(self):
        result = self.viewer.get_top_features(
            self.key, 
            field=self.field,
            cutoff=self.cutoff,
            window=self.window, 
            rel=self.rel
        )
        return result
        
    # Designed to be mapped across the result of query_top_features.  Extracted
    # from the inner loop of get_top_features.
    def format_line(self, candidate):
        cand, score = candidate
        rel = self.rel
        
        if rel==None:
            r=cand.split(':')[0]
            candtag=cand.split(':')[1]
        else:
            candtag=cand
            r=rel

        x = "({},{}) : {}".format(
            cand, score, 
            self.viewer.find_specific_text(
                candtag, self.key, r, field=self.field, display=self.display,
                examples=self.examples, window=self.window
            )
        )

        return x



    

