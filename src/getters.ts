import { DisplayableTable } from './interfaces';

const getters = {
    age(state, getters) {
        return state.age;
    },
    field(state, getters) {
        return state.field;
    },
    cutoff(state, getters) {
        return state.cutoff;
    },
    word(state, getters) {
        return state.word;
    },
    findTagsData(state, getters) {
        return state.findTagsData;
    },
    value(state, getters) {
        return state.value;
    },
    window(state, getters) {
        return state.window;
    },
    displaySelectedData(state, getters) {
        return state.displaySelectedData;
    },
    tagField(state, getters) {
        return state.tagField;
    },
    tagMatch(state, getters) {
        return state.tagMatch;
    },
    findTextBySemanticTagData(state, getters) {
        return state.findTextBySemanticTagData;
    },
    findWordsBySemanticTagData(state, getters) {
        return state.findWordsBySemanticTagData;
    },
    relation(state, getters) {
        return state.relation;
    },
    cooccurrenceCandidateTextsData(state, getters) {
        return state.cooccurrenceCandidateTextsData;
    },
    cooccurrenceExamplesData(state, getters) {
        return state.cooccurrenceExamplesData;
    },
    cooccurrenceTopRelationsData(state, getters) {
        return state.cooccurrenceTopRelationsData;
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
    findSimilarityData(state, getters) {
        return state.findSimilarityData;

    },
    findNearestNeighboursData(state, getters) {
        return state.findNearestNeighboursData;
    },
    compareCorporaData(state, getters) {
        return state.compareCorporaData;
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
    }
};

export default getters;
