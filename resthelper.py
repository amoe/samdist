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
            self.find_specific_text(
                candtag, self.key, r, field=self.field, display=self.display,
                examples=self.examples, window=self.window
            )
        )

        return x

    def find_specific_text(
        self, semtag, withtag, rel, field='SEMTAG3', display=True, examples=1,
        window=10
    ):
        occurrences = self.get_occurrences_for_one_candidate(
            semtag, withtag, rel, field
        )

        #print(occurrences.groupby(groupby)['UID'].unique())
        self.viewer.selected=occurrences.groupby(groupby)['UID'].unique()[0]
        mylemmas=occurrences.groupby(groupby)['UID'].nunique()
        mylemmas=mylemmas.sort_values(ascending=False)
        mylist=list(mylemmas[0:10].index.values)
        mylist=[(t,mylemmas[t]) for t in mylist]
        return mylist

    def get_occurrences_for_one_candidate(self, semtag, withtag, rel, field):
        semtag=self.viewer.match_tag(semtag,field=field)
        withtag=self.viewer.match_tag(withtag,field=field)
        df=self.viewer.get_dataframe()
        df=df[df['LEMMA']!='NULL']

        if rel.startswith('_'):
            rel=rel.split('_')[1]
            rev=True
        else:

            rev=False

        if rev:
            occurrences=df[df[field]==withtag]
            chunks=list(occurrences['chunk'])
            ids=list(occurrences['id'])

            occurrences=df[df['chunk'].isin(chunks)][df['gram_head'].isin(ids)][df[field]==semtag][df['gram_dep']==rel]
            #need to eliminate chance overlap between different chunks and ids

            cdict={}
            for i,c in enumerate(chunks):
                sofar=cdict.get(c,[])
                sofar.append(i)
                cdict[c]=sofar
            hdict={}
            for i,h in enumerate(ids):
                sofar=hdict.get(h,[])
                sofar.append(i)
                hdict[h]=sofar

            okids=[]
            for occ in occurrences.itertuples():
                #print(occ[3],occ[19])
                #print(cdict.get(occ[3],-1),hdict.get(occ[19],-2))
                cplace=cdict.get(occ[3],[])
                hplace=hdict.get(occ[19],[])
                for c in cplace:
                    for h in hplace:
                        if c==h:
                            okids.append(occ[2])
            #occurrences=df[df['fileid'].isin(okids)][df['chunk'].isin(chunks)][df['gram_head'].isin(ids)][df[field]==semtag][df['gram_dep']==rel]
            occurrences=occurrences[occurrences['fileid'].isin(okids)]
        else:
            occurrences=df[df[field]==withtag][df['gram_dep']==rel]
            chunks=list(occurrences['chunk'])
            heads=list(occurrences['gram_head'])
            occurrences=df[df['chunk'].isin(chunks)][df['id'].isin(heads)][df[field]==semtag]

            #filtering of chance overlaps
            cdict = {}
            for i, c in enumerate(chunks):
                sofar=cdict.get(c,[])
                sofar.append(i)
                cdict[c] = sofar
            hdict = {}
            for i, h in enumerate(heads):
                sofar=hdict.get(h,[])
                sofar.append(i)
                hdict[h] = sofar
            okids=[]
            for occ in occurrences.itertuples():
                cplace=cdict.get(occ[3],[])
                hplace=hdict.get(occ[5],[])
                for c in cplace:
                    for h in hplace:
                        if c==h:
                            okids.append(occ[2])
            occurrences=occurrences[occurrences['fileid'].isin(okids)]

        return occurrences
        

    # remember that this will only get examples for 1 candidate!
    def get_examples_for_one_candidate(self, candidate):
        rel = self.rel
        cand, score = candidate

        if rel==None:
            r=cand.split(':')[0]
            candtag=cand.split(':')[1]
        else:
            candtag=cand
            r=rel

        occurrences = self.get_occurrences_for_one_candidate(
            candtag, self.key, r, self.field
        )


        if self.viewer.lowercase:
            groupby='vard_lower'
        else:
            groupby='vard'

        self.viewer.selected=occurrences.groupby(groupby)['UID'].unique()[0]

        # unfortunately also does all the formatting, so...
        result = None
        result = self.viewer.display_selected(
            cutoff=self.examples, window=self.window
        )

        return result
    
    def get_examples_for_all_candidates(self, candidate_list):
        result = []

        for candidate in candidate_list:
            examples = self.get_examples_for_one_candidate(candidate)
            item = (candidate, examples)
            result.append(item)
            
        return result


