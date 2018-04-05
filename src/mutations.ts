import { DisplayableTable } from './interfaces';
import mc from './mutation-constants';

export default {
    setTableData(state, payload: DisplayableTable) {
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
    [mc.SWITCH_TASK]: (state, taskName: string) => {
        state.visibleTask = taskName;
        state.tableData = [];
        state.chartData = null;
    },
    [mc.CLEAR_CHART_DATA]: (state) => {
        state.chartData = null;
    },
    [mc.STEP_WORD_THROUGH]: (state, columnValue) => {
        state.visibleTask = 'displayExamplesByWord';
        state.tableData = [];
        state.chartData = null;
        state.word = columnValue;
        state.field = 'SEMTAG3';  // yuck
        state.value = state.tagMatch;
    },
    [mc.STEP_CATEGORY_THROUGH]: (state, category) => {
        state.visibleTask = 'displayExamplesByWord';
        state.tableData = [];
        state.chartData = null;
        state.word = category;
        state.field = 'vard';
        state.value = '';
    },
    [mc.SET_CURRENT_CORPUS]: (state, currentCorpus) => {
        state.currentCorpus = currentCorpus;
    }
};
