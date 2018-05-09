import { DisplayableTable } from './interfaces';

const getters = {
    field(state, getters) {
        return state.field;
    },
    cutoff(state, getters) {
        return state.cutoff;
    },
    word(state, getters) {
        return state.word;
    },
    value(state, getters) {
        return state.value;
    },
    window(state, getters) {
        return state.window;
    },
    tagField(state, getters) {
        return state.tagField;
    },
    tagMatch(state, getters) {
        return state.tagMatch;
    },
    relation(state, getters) {
        return state.relation;
    },
    examples(state, getters) {
        return state.examples;
    },
    semtagA(state, getters) {
        return state.semtagA;
    },
    semtagB(state, getters) {
        return state.semtagB;
    },
    measure(state, getters) {
        return state.measure;
    },
    corpusKey(state, getters) {
        return state.corpusKey;
    },
    visibleTask(state, getters) {
        return state.visibleTask;
    },
    count(state, getters) {
        return state.count;
    },
    error(state, getters) {
        return state.error;
    },
    inProgressCount(state, getters) {
        return state.inProgressCount;
    },
    tableData(state, getters): DisplayableTable {
        return state.tableData;
    },
    chartData(state, getters) {
        return state.chartData;
    },
    currentCorpus(state, getters) {
        return state.currentCorpus;
    },
    availableCorpora(state, getters) {
        return state.availableCorpora;
    }
};

export default getters;
