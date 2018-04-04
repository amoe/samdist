import utility from './utility';
import {DisplayableTable} from './interfaces';
import taskConstructors from './task-constructors';

const FIELD_TOOLTIP = "The field to use"

const bagOfWordsTask = {
    title: "Bag of Words",
    description: `
      This allows you to view overall statistics on the most frequent words or
      semantic tags used within the corpus.
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

const displayExamplesByWordTask = {
    title: "Display Examples by Word",
    description: `
      Displays portions of example text found by searching for a particular word.      

      The 'field' and 'value' controls allow you to filter the list of examples
      to match the particular criteria entered.  For instance, you can filter
      by a specific value for SEMTAG3.

      Try filtering by the word 'woman' with a SEMTAG3 value of AY.06.b.

      You don't have to fill in a filter value: just leave it blank to show
      ALL matches.
    `,
    fields: [
        {
            name: 'word',
            label: 'Word',
            mutation: 'updateWord',
            getter: 'word'
        },
        {
            name: 'field',
            label: 'Field',
            mutation: 'updateField',
            getter: 'field'
        },
        {
            name: 'value',
            label: 'Value',
            mutation: 'updateValue',
            getter: 'value'
        },
        {
            name: 'window',
            label: 'Window',
            mutation: 'updateWindow',
            getter: 'window'
        }
    ],
    // XXX: Rename this stuff
    runAction: 'submitDisplayExamplesByWordRequest',
    successHandler: function (this: any, r) {
        this.$store.commit('setTableData', r.data);
    },
    resultComponent: 'tableWidget'
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
        this.$store.dispatch('drawChart', {
            data: r.data,
            xTitle: "Characteristic field value",
            yTitle: "llr (Score)"
        });
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
        this.$store.commit('setTableData', r.data)
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
};

const findNearestNeighboursTask = {
    title: "Find nearest neighbours",
    description: `
      Find the nearest neighbours for the concept, listed by distance, 
      (optionally) within a given relation.
    `,
    fields: [
        {
            name: 'tagMatch',
            label: 'Match',
            mutation: 'updateTagMatch',
            getter: 'tagMatch'
        },
        {
            name: 'relation',
            label: 'Relation',
            mutation: 'updateRelation',
            getter: 'relation'
        },
    ],
    runAction: 'submitFindNearestNeighboursRequest',
    successHandler: function (this: any, r) {
        this.$store.commit('setTableData', r.data);
    },
    resultComponent: 'tableWidget'
};

const findTextBySemanticTagTask = {
    title: "Find text by semantic tag",
    description: `
      This view will filter on semantic tag values and then filter again by
      a given field/value combination.  For instance, try AD.03.b in the
      'match' field.  This will filter in examples of AD.03.b containing
      the word 'piece', allowing you to 'focus' in on surprising words.
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
            name: 'field',
            label: 'Field',
            mutation: 'updateField',
            getter: 'field'
        },
        {
            name: 'value',
            label: 'Value',
            mutation: 'updateValue',
            getter: 'value'
        },
        {
            name: 'window',
            label: 'Window',
            mutation: 'updateWindow',
            getter: 'window'
        },
        {
            name: 'cutoff',
            label: 'Cutoff',
            mutation: 'updateCutoff',
            getter: 'cutoff'
        }
    ],
    runAction: 'submitFindTextBySemanticTagRequest',
    successHandler: function (this: any, r) {
        this.$store.commit('setTableData', r.data);
    },
    resultComponent: 'tableWidget'
};

const findWordsBySemanticTagTask = taskConstructors.makeTableTask();

const taskDefinitions = {
    'bagOfWords': bagOfWordsTask,
    'findTags': findTagsTask,
    'computeSurprises': computeSurprisesTask,
    'cooccurrenceTopRelations': cooccurrenceTopRelationsTask,
    'cooccurrenceTopFeatures': cooccurrenceTopFeaturesTask,
    'displayExamplesByWord': displayExamplesByWordTask,
    'findNearestNeighbours': findNearestNeighboursTask,
    'findTextBySemanticTag': findTextBySemanticTagTask,
    'findWordsBySemanticTag': findWordsBySemanticTagTask
}

export default taskDefinitions;
