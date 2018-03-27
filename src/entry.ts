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
import mutations from './constants';

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
        tableData: [],
        visibleTask: 'bagOfWords',
        chartData: null
    },
    mutations: {
        setTableData(state, payload: any) {
            state.tableData = payload;
        },
        setChartData(state, payload: any) {
            state.chartData = payload;
        },
        increment(state) {
            state.count++;
        },
        updateField(state, payload: string) {
            state.field = payload;
        },
        updateCutoff(state, payload: number) {
            state.cutoff = payload;
        },
        updateValue(state, payload: string) {
            state.value = payload;
        },
        updateWindow(state, payload: number) {
            state.window = payload;
        },
        updateRelation(state, payload: number) {
            state.relation = payload;
        },
        errorOccurred(state, payload) {
            state.error = payload;
        },
        errorDismissed(state) {
            state.error = null;
        },
        operationStarted(state) {
            state.inProgressCount++;
        },
        operationFinished(state) {
            state.inProgressCount--;
        },
        updateWord(state, payload: string) {
            state.word = payload;
        },
        updateExamples(state, payload: string) {
            state.examples = payload;
        },
        updateTagMatch(state, payload: string) {
            state.tagMatch = payload;
        },
        updateTagField(state, payload: string) {
            state.tagField = payload;
        },
        setFindTagsData(state, payload) {
            state.findTagsData = payload;
        },
        setDisplaySelectedData(state, payload) {
            state.displaySelectedData = payload;
        },
        setFindWordsBySemanticTagData(state, payload) {
            state.findWordsBySemanticTagData = payload;
        },
        setFindTextBySemanticTagData(state, payload) {
            state.findTextBySemanticTagData = payload;
        },
        setCooccurrenceCandidateTextsData(state, payload) {
            state.cooccurrenceCandidateTextsData = payload;
        },
        setCooccurrenceTopRelationsData(state, payload) {
            state.cooccurrenceTopRelationsData = payload;
        },
        setCooccurrenceExamplesData(state, payload) {
            state.cooccurrenceExamplesData = payload;
        },
        setFindSimilarityData(state, payload: number) {
            state.findSimilarityData = payload;
        },
        updateSemtagA(state, payload: string) {
            state.semtagA = payload;
        },
        updateSemtagB(state, payload: string) {
            state.semtagB = payload;
        },
        setFindNearestNeighboursData(state, payload) {
            state.findNearestNeighboursData = payload;
        },
        updateCorpusKey(state, payload) {
            state.corpusKey = payload;
        },
        updateMeasure(state, payload) {
            state.measure = payload;
        },
        setCompareCorporaData(state, payload) {
            state.compareCorporaData = payload;
        },
        [mutations.SWITCH_TASK]: (state, taskName: string) => {
            state.visibleTask = taskName;
            state.tableData = [];
        },
        [mutations.CLEAR_CHART_DATA]: (state) => {
            state.chartData = null;
        }
    },
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
