// actions.ts

import axios from 'axios';
import transformer from './transformer';
import {DiscreteStatistic} from './interfaces';
import * as dimple from 'dimple';

const API_PREFIX = "/api";

const actions = {
    increment(context) {
        context.commit('increment')
    },
    submitBagOfWordsRequest(store, payload) {
        console.log("submitting bag of words request");

        console.log("payload is %o", payload);
        
        const queryString = {
            field: payload.field,
            cutoff: payload.cutoff
        };
        

        console.log("query string is %o", queryString);

        return axios.get(API_PREFIX + "/bag-of-words", {
            params: {
                field: payload.field,
                cutoff: payload.cutoff
            }
        });
    },
    drawGraph(store, payload) {
        console.log("I'm going to draw the graph");
        console.log("received the data as %o", payload.data);

        const data  = transformer.transformFromNetwork(payload.data);
        var filteredData = data.slice(0, 20);

        var svg = dimple.newSvg("#chartContainer", 590, 400);
        const myChart = new dimple.chart(svg, filteredData);
        myChart.setBounds(60, 30, 510, 305)
        const x = myChart.addCategoryAxis("x", 'category');
        x.addOrderRule("Date");
        myChart.addMeasureAxis("y", 'value');
        myChart.addSeries(null, dimple.plot.bar);
        myChart.draw();
    },
    handleError(store, payload) {
        console.log("I'm going to pop an error dialogue");
        store.commit('errorOccurred', {message: "Something bad happened."});
    }
};

export default actions;
