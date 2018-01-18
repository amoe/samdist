// main.js

import * as d3 from 'd3';

var c;

function drawBarChart() {
    var that = {};
    that.render = function() {
        var svg = d3.select('body')
            .append('svg')
            .attr('height', '500')
            .attr('width', '500')
            .append('g')
            .attr('transform', "translate(0, 0)");
    };

    return that;
}

function getSvg() {
    return d3.select('svg');
}

var assert = require('chai').assert;

// beforeEach(function() {
//     c = drawBarChart();
//     c.render();
// });

it('can be created', function () {
    const result = getSvg();
    assert.isFalse(getSvg().empty());
});
