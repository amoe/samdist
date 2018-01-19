// entry.ts

import barChart from './src/bar-chart.js';
import axios from 'axios';

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
    barChart.drawBarChart(testData).render();
});

document.addEventListener("DOMContentLoaded", e => {
    axios.get("/bow_query_data.json").then(function(response) {
        console.log("success: %o", response.data);
    }).catch(function(error) {
        console.log("error: %o", error);
    });
});
