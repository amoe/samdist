import utility from './utility';

const FIELD_TOOLTIP = "The field to use"

const bagOfWordsTask = {
    title: "Bag of Words",
    description: `
      This allows you to view the most frequent semantic tags used within the
      corpus.
`,
    fields: [
        {
            name: 'field',
            label: 'Field',
            mutation: 'updateField',
            getter: 'field',
            tooltip: FIELD_TOOLTIP
        },
        {
            name: 'cutoff',
            label: 'Cutoff',
            mutation: 'updateCutoff',
            getter: 'cutoff'
        }
    ],
    runAction: 'submitBagOfWordsRequest',
    successHandler: function (this: any, r) {
        console.log("reached the success handler");
        console.log("this is %o", this);
        this.$store.dispatch('drawChart', r)
    },
    resultComponent: 'chartWidget'
};

const computeSurprisesTask = {
    title: "Find Surprises -- Graphical",
    description: `
       Will compute characteristic terms of "this" corpus -- that defined by
       the Corpus Key, eg 'mnonl', etc -- relative to another corpus.  Plots
       semantic tags on x axis by score from the "surprise" measure on the y
       axis.   Default measure is llr (log-likelihood ratio).  Cutoff is used
       to constrain the data shown in the graph.
`,
    fields: [
        {
            name: 'corpusKey',
            label: 'Corpus key',
            mutation: 'updateCorpusKey',
            getter: 'corpusKey'
        },
        {
            name: 'measure',
            label: 'Measure',
            mutation: 'updateMeasure',
            getter: 'measure'
        },
        {
            name: 'field',
            label: 'Field',
            mutation: 'updateField',
            getter: 'field'
        },
        {
            name: 'cutoff',
            label: 'Cutoff',
            mutation: 'updateCutoff',
            getter: 'cutoff'
        }
    ],
    runAction: 'submitCompareCorporaRequest',
    successHandler: function (this: any, r) {
        console.log("data is %o", r.data);
//        this.$store.commit('setCompareCorporaData', r.data)
        this.$store.dispatch('drawChart', r)
    },
    // XXX, this should also be a table widget!
    resultComponent: 'chartWidget'
};

const findTagsTask = {
    title: 'Find tags by word',
    description: `
        Technically this does a corpus search for the given word, matching 
        implicitly on the vard field.  It returns the values of the field given,
        but you probably want SEMTAG3.
    `,
    fields: [
        {
            name: 'field',
            label: 'Field',
            mutation: 'updateField',
            getter: 'field'
        },
        {
            name: 'word',
            label: 'Word',
            mutation: 'updateWord',
            getter: 'word'
        }
    ],
    runAction: 'submitFindTagsRequest',
    successHandler: function (this: any, r) {
        this.$store.commit('setFindTagsData', r.data)
    },
    resultComponent: 'tableWidget'
};

const cooccurrenceTopRelationsTask = {
    title: "Top co-occurrence relations",
    description: `
       This will show the usage distribution of grammatical relations (determiner,
       direct object, subject, and our other friends), when they are used in
       conjunction with a specific semantic category.

       You can also use 'vard' as the match field to narrow the search to a
       specific value.

       Cutoff allows you to limit the results to only the top 10 rows, etc.
    `,
    fields: [
        {
            name: 'tagMatch',
            label: 'Match',
            mutation: 'updateTagMatch',
            getter: 'tagMatch'
        },
        {
            name: 'tagField',
            label: 'Match field',
            mutation: 'updateTagField',
            getter: 'tagField'
        },
        {
            name: 'cutoff',
            label: 'Cutoff',
            mutation: 'updateCutoff',
            getter: 'cutoff'
        }
    ],
    runAction: 'submitCooccurrenceTopRelationsRequest',
    successHandler: function (this: any, r) {
        this.$store.dispatch(
            'drawChart', {
                data: r.data, xTitle: "Grammatical relation",
                yTitle: "PPMI Score"
            }
        );
    },
    resultComponent: 'chartWidget'
};

const cooccurrenceTopFeaturesTask = {
    title: "Top co-occurrence features",
    description: `
      This can be used to look up co-occurrences.  Any semantic category may
      have other categories that obviously relate to them.  For instance,
      the category representing food might be frequently used with
      the category of eating.  

      This relation might also be in a specific grammatical relation,
      e.g. direct object: 'I eat food'.  You can use the relation field to only
      show results within this relation.

      The 'window' field isn't useful in this particular query.
    `,
    fields: [
        {
            name: 'tagMatch',
            label: 'Match',
            mutation: 'updateTagMatch',
            getter: 'tagMatch'
        },
        {
            name: 'tagField',
            label: 'Match field',
            mutation: 'updateTagField',
            getter: 'tagField'
        },
        {
            name: 'relation',
            label: 'Relation',
            mutation: 'updateRelation',
            getter: 'relation'
        },
        {
            name: 'cutoff',
            label: 'Cutoff',
            mutation: 'updateCutoff',
            getter: 'cutoff'
        },
        {
            name: 'window',
            label: 'Window',
            mutation: 'updateWindow',
            getter: 'window'
        }

    ],
    runAction: 'submitCooccurrenceTopFeaturesRequest',
    successHandler: function (this: any, r) {
        this.$store.dispatch(
            'drawChart', {
                data: r.data,
                xTitle: "Category co-occurring with the requested value",
                yTitle: "PPMI Score"
            }
        );
    },
    resultComponent: 'chartWidget'
}

const taskDefinitions = {
    'bagOfWords': bagOfWordsTask,
    'findTags': findTagsTask,
    'computeSurprises': computeSurprisesTask,
    'cooccurrenceTopRelations': cooccurrenceTopRelationsTask,
    'cooccurrenceTopFeatures': cooccurrenceTopFeaturesTask
}

export default taskDefinitions;
