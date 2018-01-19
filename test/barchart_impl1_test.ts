// main.js

import * as d3 from 'd3';
import _ from 'lodash';
import barChart from '../src/bar-chart.js';
import {assert} from 'chai';

var c;

var testData = [
    5, 10, 13, 19, 21, 25
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

    assert.equal(d3.selectAll('rect').size(),  6);
});

function getBounds() {
    const rectangles = d3.selectAll('rect');
    const existingBounds = [];

    // build a set of x and w coordinates.
    rectangles.each(
        function (d, i, nodes) {
            
            // These come out as strings!  Have to re-parse them to numbers.
            const x = parseFloat(d3.select(this).attr('x'));
            const w = parseFloat(d3.select(this).attr('width'));
            const h = parseFloat(d3.select(this).attr('height'));   // refactor
            const y = parseFloat(d3.select(this).attr('y'));

            existingBounds.push({x: x, w: w, h: h, y: y});
        }
    );

    return existingBounds;

}

it('produces rectangles that do not overlap horizontally', function() {
    c = barChart.drawBarChart(testData);
    c.render();

    const existingBounds = getBounds();

    var anyOverlaps = false;

    // Sort ascending
    existingBounds.sort(function(a, b) {return a.x - b.x;});

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

function repeatArray(n, arr) {
    return _.flatten(_.times(n, _.constant(arr)));
}

it('handles longer datasets without overflowing', function() {
    // length is now 24
    const longDataSet = repeatArray(4, testData);

    c = barChart.drawBarChart(longDataSet);
    c.render();

    const existingBounds = getBounds();

    let thisRect;
    var isOverflowingXBounds = _.some(
        existingBounds, r => (r.x + r.w) > 500
    );

    assert.isFalse(isOverflowingXBounds);
});

it('scales bar sizes relative to the number of elements', function() {
    c = barChart.drawBarChart(testData);
    c.render();
    const bounds1 = getBounds();
    d3.selectAll('svg').remove();

    c = barChart.drawBarChart(testData.concat([1]));
    c.render();
    const bounds2 = getBounds();
    d3.selectAll('svg').remove();

    assert.notEqual(bounds1[0].w, bounds2[0].w);
});

it('scales bar heights relative to the size of the data point', function() {
    c = barChart.drawBarChart(testData);
    c.render();

    const bounds = getBounds();
    assert.notEqual(bounds[0].h, bounds[1].h);
});


it("modifies the y-positions of bars heights to position them", function() {
    c = barChart.drawBarChart(testData);
    c.render();

    const bounds = getBounds();
    assert.notEqual(bounds[0].y, bounds[1].y);
});

