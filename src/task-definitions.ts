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

const taskDefinitions = {
    'bagOfWords': bagOfWordsTask
}

export default taskDefinitions;
