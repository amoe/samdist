import sinon from 'sinon';
import barChart from '../src/bar-chart.js'
var assert = require('chai').assert;


it('calls the provided logging function', function() {
    var theSpy = sinon.spy()

    barChart.logClient(theSpy);

    assert.isTrue(theSpy.called);
    assert.isTrue(theSpy.calledWith("some argument", 42));
});
