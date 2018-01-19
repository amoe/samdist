// entry.ts

import * as log from 'loglevel';
import barChart from './src/bar-chart';
import axios from 'axios';
import mymodule from './src/mymodule';
import transformer from './src/transformer';

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
        barChart.drawBarChart(transformed, 5).render();
    }).catch(function(error) {
        console.log("error: %o", error);
    });
});
