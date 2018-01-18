// main.js

import * as d3 from 'd3';
import foo from '../src/bar-chart.js'
import sinon from 'sinon';

var c;

var testData =  [{ date: '2014-01', value: 100}, {date: '2014-02', value: 215}];

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

it('has the correct width', function() {
    assert.equal(getSvg().attr('width'), 500);
});

it('has the correct height', function() {
    assert.equal(getSvg().attr('height'), 500);
});

it('calls the provided logging function', function() {
    var theSpy = sinon.spy()

    foo.logClient(theSpy);

    assert.isTrue(theSpy.called);
    assert.isTrue(theSpy.calledWith("some argument", 42));
});
