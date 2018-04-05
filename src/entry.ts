// entry.ts

import * as log from 'loglevel';
import axios from 'axios';
import mymodule from './mymodule';
import transformer from './transformer';
import ApplicationRoot from './components/ApplicationRoot.vue';
import * as dimple from 'dimple';
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { DisplayableTable } from './interfaces';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters,
    state: {
        count: 0,
        cutoff: 10,   // 10 is the reasonable number of bars for a bar chart
        error: null,
        inProgressCount: 0,
        field: 'vard',
        value: 'piece',
        window: 10,
        word: "woman",
        tagMatch: 'AY.01.g.01',
        tagField: 'SEMTAG3',
        relation: null,
        findTagsData: [],
        displaySelectedData: [],
        findWordsBySemanticTagData: [],
        findTextBySemanticTagData: [],
        cooccurrenceCandidateTextsData: [],
        cooccurrenceExamplesData: [],
        cooccurrenceTopRelationsData: [],
        examples: 3,
        // Used for comparing semantic similarity
        semtagA: 'AD.03.a',
        semtagB: 'AD.03.b',
        findSimilarityData: null,
        findNearestNeighboursData: [],
        corpusKey: 'fnonl',
        measure: 'llr',
        compareCorporaData: [],
        visibleTask: 'bagOfWords',
        // Important that these are actually null and that they are not empty
        // arrays, otherwise GenericTask will attempt to instantiate the chart
        // component with an empty array which can't be logically drawn and will
        // cause errors.
        tableData: null,
        chartData: null,
        currentCorpus: null,
        availableCorpora: null
    },
    mutations,
    actions
});

log.setLevel('debug');

function getRenderingMode() {
    let result: string;

    if (document.compatMode === 'CSS1Compat') {
        result = "STANDARDS_COMPLIANCE";
    } else {
        result = "QUIRKS";
    }

    return result;
}



var testData = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23
];

document.addEventListener("DOMContentLoaded", e => {
    console.log("Rendering mode: %o", getRenderingMode());
    console.log("The answer is: %o", mymodule.meaningOfLife());

});

document.addEventListener("DOMContentLoaded", e => {
    const vueInstance = new Vue({
        render: h => h(ApplicationRoot),
        store: store
    });
    vueInstance.$mount('#vue-outlet');
});
