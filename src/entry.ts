// entry.ts

import * as log from 'loglevel';
import axios from 'axios';
import barChart from './bar-chart';
import mymodule from './mymodule';
import transformer from './transformer';
import ApplicationRoot from './components/ApplicationRoot.vue';
import * as dimple from 'dimple';
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        field: 'SEMTAG3',
        cutoff: 20,
        error: null
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        updateField(state, payload) {
            state.field = payload;
        },
        updateCutoff(state, payload) {
            state.cutoff = payload;
        },
        errorOccurred(state, payload) {
            state.error = payload;
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
    // axios.get("/bow_query_data.json").then(function(response) {
    //     const data = transformer.transformFromNetwork(response.data);
    //     var filteredData = data.slice(0, 20);

    //     var svg = dimple.newSvg("#chartContainer", 590, 400);
    //     const myChart = new dimple.chart(svg, filteredData);
    //     myChart.setBounds(60, 30, 510, 305)
    //     const x = myChart.addCategoryAxis("x", 'category');
    //     x.addOrderRule("Date");
    //     myChart.addMeasureAxis("y", 'value');
    //     myChart.addSeries(null, dimple.plot.bar);
    //     myChart.draw();
    // }).catch(function(error) {
    //     console.log("error: %o", error);
    // });
});

document.addEventListener("DOMContentLoaded", e => {
    const vueInstance = new Vue({
        render: h => h(ApplicationRoot),
        store: store
    });
    vueInstance.$mount('#vue-outlet');
});
