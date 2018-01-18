import * as d3 from 'd3';

const functions = {
    drawBarChart: function() {
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
    },
    logClient: function(logFunction) {
        logFunction("some argument", 42);
    }
};

export default functions;


