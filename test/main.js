// main.js

import * as d3 from 'd3';
import foo from '../src/bar-chart.js'

var c;


function getSvg() {
    return d3.select('svg');
}

var assert = require('chai').assert;

beforeEach(function() {
    c = foo.drawBarChart();
    c.render();
});

afterEach(function() {
    d3.selectAll('svg').remove();
});

it('can be created', function () {
    const result = getSvg();
    assert.isFalse(getSvg().empty());
});
