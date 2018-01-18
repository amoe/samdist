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
});

afterEach(function() {
    d3.selectAll('svg').remove();
});

it('can be created', function () {
    c = barChart.drawBarChart(testData);
    c.render();

    const result = getSvg();
    assert.isFalse(getSvg().empty());
});

it('has the correct width', function() {
    c = barChart.drawBarChart(testData);
    c.render();

    assert.equal(getSvg().attr('width'), 500);
});

it('has the correct height', function() {
    c = barChart.drawBarChart(testData);
    c.render();

    assert.equal(getSvg().attr('height'), 500);
});

it('produces the right number of rectangles', function() {
    c = barChart.drawBarChart(testData);
    c.render();

    assert.equal(d3.selectAll('rect').size(),  5);
});

it('produces rectangles that do not overlap horizontally', function() {
    c = barChart.drawBarChart(testData);
    c.render();

    const rectangles = d3.selectAll('rect');

    const existingBounds = [];

    // build a set of x and w coordinates.
    rectangles.each(
        function (d, i, nodes) {
            
            // These come out as strings!  Have to re-parse them into integers.
            const x = parseInt(d3.select(this).attr('x'));
            const w = parseInt(d3.select(this).attr('width'));

            existingBounds.push({x: x, w: w});
        }
    );

    var anyOverlaps = false;

    // Sort ascending
    existingBounds.sort(function(a, b) {return a.x > b.x;});

    // The first item can't overlap so start at 1.
    for (var i = 1; i < existingBounds.length; i++) {
        var lastItem = existingBounds[i - 1];
        var xMin = lastItem.x;
        var xMax = xMin + lastItem.w;

        var thisItem = existingBounds[i];
        
        if (thisItem.x <= xMax) {
            anyOverlaps = true;
            break;
        }
    }

    assert.isFalse(anyOverlaps);
});

