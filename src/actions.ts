// actions.ts

import * as log from 'loglevel';
import axios from 'axios';
import transformer from './transformer';
import { DiscreteStatistic, ChartDrawRequest } from './interfaces';
import * as dimple from 'dimple';
import * as d3 from 'd3';
import mc from './mutation-constants';

const API_PREFIX = "/api";

function makeEndpointCaller(endpoint: string) {
    return function(store, payload: object) {
        log.debug("submitting request: %o", endpoint);
        log.debug("query string is %o", payload);

        store.commit('operationStarted');
        return axios.get(
            API_PREFIX + endpoint, { params: payload }
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

    // Clear out any chart that was already drawn
    clearChart(store) {
        store.commit('clearChartData');
    },

    drawChart(store, payload: ChartDrawRequest) {
        const data = transformer.transformFromNetwork(payload.data);
        console.log("received data as %o", JSON.stringify(data));
        store.commit('setChartData', data);

        // The graph should now re-render automatically, because it's reactive.
    },

    handleError(store, payload) {
        console.log("I'm going to pop an error dialogue");
        store.commit('errorOccurred', { message: "Something bad happened." });
    },

    getCurrentCorpus(store, payload) {
        store.commit(mc.SET_CURRENT_CORPUS, 'SOMETHING');
    },

    getAvailableCorpora(store, payload) {
        axios.get(API_PREFIX + "/available-corpora").then(r => {
            store.commit(mc.SET_AVAILABLE_CORPORA, r.data);
        });
    }

};


export default actions;
