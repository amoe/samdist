import * as d3 from 'd3';

const functions = {
    drawBarChart: function(data) {
        // Very unclear to me why we need to wrap it in this object, supposedly
        // for testability.  This is based on a suggestion of an article from
        // 'busypeoples'.
        var that = {};

        var barWidth = 20;
        var padding = 1;

        var viewWidth = 500;
        var viewHeight = 500;

        const dynamicBarWidth = (viewWidth / data.length) - padding;

        that.render = function() {
            var svg = d3.select('body')
                .append('svg')
                .attr('height', '500')
                .attr('width', viewWidth);

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', function (d, i) { 
                    return i * (viewWidth / data.length);
                })
                .attr('y', function (d, i) { return viewHeight - (d*4); })
                .attr('width', dynamicBarWidth)
                .attr('height', function (d, i) { return (d*4); });
        };

        return that;
    },
    logClient: function(logFunction) {
        logFunction("some argument", 42);
    }
};

export default functions;


