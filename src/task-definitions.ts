const FIELD_TOOLTIP = "The field to use"

const bagOfWordsTask = {
    title: "Bag of Words v3",
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

const taskDefinitions = {
    'bagOfWords': bagOfWordsTask,
    'findTags': findTagsTask,
    'computeSurprises': computeSurprisesTask,
}

export default taskDefinitions;
