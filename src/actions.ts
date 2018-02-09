// actions.ts

import * as log from 'loglevel';
import axios from 'axios';
import transformer from './transformer';
import {DiscreteStatistic, ChartDrawRequest} from './interfaces';
import * as dimple from 'dimple';
import * as d3 from 'd3';

const API_PREFIX = "/api";

function makeEndpointCaller(endpoint: string) {
    return function (store, payload: object) {
        log.debug("submitting request: %o", endpoint);
        log.debug("query string is %o", payload);

        store.commit('operationStarted');
        return axios.get(
            API_PREFIX + endpoint, {params: payload}
        );
    };
}

const actions = {
    increment(context) {
        context.commit('increment')
    },

    submitBagOfWordsRequest: makeEndpointCaller("/bag-of-words"),
    submitFindTagsRequest: makeEndpointCaller("/find-tags"),
    submitDisplayExamplesByWordRequest: makeEndpointCaller("/display-examples-by-word"),
    submitFindWordsBySemanticTagRequest: makeEndpointCaller("/find-words-by-semantic-tag"),
    submitFindTextBySemanticTagRequest: makeEndpointCaller("/find-text-by-semantic-tag"),
    submitCooccurrenceTopFeaturesRequest: makeEndpointCaller("/get-top-features"),
    submitCooccurrenceTopRelationsRequest: makeEndpointCaller("/get-top-relations"),
    submitGetCooccurrenceCandidateTextsRequest: makeEndpointCaller("/get-cooccurrence-candidate-texts"),
    submitGetCooccurrenceExamplesRequest: makeEndpointCaller("/get-cooccurrence-examples"),
    submitFindSimilarityRequest: makeEndpointCaller("/find-similarity"),
    submitFindNearestNeighboursRequest: makeEndpointCaller("/find-nearest-neighbours"),
    submitCompareCorporaRequest: makeEndpointCaller("/compare-corpora"),

    drawChart(store, payload: ChartDrawRequest) {
        const xTitle = "Category";
        const yTitle = "Value";

        const data  = transformer.transformFromNetwork(payload.data);

        const svgSelection = d3.select('#chartTarget');

        // Clear out any chart that was already drawn
        svgSelection.selectAll('*').remove();

        if (svgSelection.empty()) {
            throw new Error("somehow failed to find the chart target");
        }

        console.log("svg selection is %o", svgSelection);
        
        const myChart = new dimple.chart(svgSelection, data);
        myChart.setBounds(60, 30, 510, 305);

        const x = myChart.addCategoryAxis("x", 'category');
        x.title = payload.xTitle;

        const y = myChart.addMeasureAxis("y", 'value');
        y.title = payload.yTitle;

        myChart.addSeries(null, dimple.plot.bar);
        myChart.draw();
    },

    handleError(store, payload) {
        console.log("I'm going to pop an error dialogue");
        store.commit('errorOccurred', {message: "Something bad happened."});
    }
};


export default actions;
