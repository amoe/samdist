// entry.ts

import * as log from 'loglevel';
import axios from 'axios';
import barChart from './bar-chart';
import mymodule from './mymodule';
import transformer from './transformer';
import ApplicationRoot from './components/ApplicationRoot.vue';
import Vue from 'vue';

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
    axios.get("/bow_query_data.json").then(function(response) {
        console.log("success: %o", response.data);
        const transformed = transformer.transformFromNetwork(response.data);
        barChart.drawBarChart(transformed, 20).render();
    }).catch(function(error) {
        console.log("error: %o", error);
    });
});

document.addEventListener("DOMContentLoaded", e => {
    const vueInstance = new Vue({components: {ApplicationRoot}});
    vueInstance.$mount('#vue-outlet');
});
