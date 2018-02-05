const bagOfWordsTask = {
    title: "Bag of Words v3",
    fields: [
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
    runAction: 'submitBagOfWordsRequest',
    successHandler: function (this: any, r) {
        console.log("reached the success handler");
        console.log("this is %o", this);
        this.$store.dispatch('drawGraph', r)
    },
    resultComponent: 'chartWidget'
};

const computeSurprisesTask = {
    title: "Compare corpora & find surprises",
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
        this.$store.commit('setCompareCorporaData', r.data)
        this.$store.dispatch('drawCompareCorporaGraph', r)
    },
    // XXX, this should also be a table widget!
    resultComponent: 'chartWidget'
}

const taskDefinitions = {
    'bagOfWords': bagOfWordsTask,
    'computeSurprises': computeSurprisesTask
}

export default taskDefinitions;
