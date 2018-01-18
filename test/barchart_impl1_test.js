// main.js

import * as d3 from 'd3';
import barChart from '../src/bar-chart.js'
var assert = require('chai').assert;

var c;

var testData = [
    5, 10, 13, 19, 21
];

function getSvg() {
    return d3.select('svg');
}


beforeEach(function() {
    c = barChart.drawBarChart(testData);
    c.render();
});

afterEach(function() {
    d3.selectAll('svg').remove();
});

it('can be created', function () {
    const result = getSvg();
    assert.isFalse(getSvg().empty());
});

it('has the correct width', function() {
    assert.equal(getSvg().attr('width'), 500);
});

it('has the correct height', function() {
    assert.equal(getSvg().attr('height'), 500);
});

it('produces the right number of rectangles', function() {
    assert.equal(d3.selectAll('rect').size(),  5);
});
