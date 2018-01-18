import * as d3 from 'd3';

const functions = {
    drawBarChart: function(data) {
        // Very unclear to me why we need to wrap it in this object, supposedly
        // for testability.  This is based on a suggestion of an article from
        // 'busypeoples'.
        var that = {};
        that.render = function() {
            var svg = d3.select('body')
                .append('svg')
                .attr('height', '500')
                .attr('width', '500');

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 20)
                .attr('height', 100);
        };

        return that;
    },
    logClient: function(logFunction) {
        logFunction("some argument", 42);
    }
};

export default functions;


