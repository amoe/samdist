// actions.ts

import * as log from 'loglevel';
import axios from 'axios';
import transformer from './transformer';
import {DiscreteStatistic, ChartDrawRequest} from './interfaces';
import * as dimple from 'dimple';

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

        var svg = dimple.newSvg("#chartContainer", 590, 400);
        const myChart = new dimple.chart(svg, data);
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
