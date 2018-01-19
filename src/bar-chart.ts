import * as d3 from 'd3';
import * as log from 'loglevel';

const functions = {
    drawBarChart: function(data, cutoff?: number) {
        log.debug("starting to draw graph");

        // Very unclear to me why we need to wrap it in this object, supposedly
        // for testability.  This is based on a suggestion of an article from
        // 'busypeoples'.
        var that = {
            render: null
        };

        var barWidth = 20;
        var padding = 1;

        var viewWidth = 500;
        var viewHeight = 500;

        var filteredData;
        if (cutoff != null) {
            filteredData = data.slice(0, cutoff);
        } else {
            filteredData = data;
        }

        const dynamicBarWidth = (viewWidth / filteredData.length) - padding;

        const yDomainMax = d3.max(filteredData, x => x);

        // because y increases as the data value gets smaller, the range must
        // be different on this one -- see the reversed arguments in range()
        const yScale1 = d3.scaleLinear()
          .domain([0, yDomainMax])
          .range([viewHeight, 0]);

        const yScale2 = d3.scaleLinear()
          .domain([0, yDomainMax])
          .range([0, viewHeight]);
        
        that.render = function() {
            var svg = d3.select('body')
                .append('svg')
                .attr('height', '500')
                .attr('width', viewWidth);

            svg.selectAll('rect')
                .data(filteredData)
                .enter()
                .append('rect')
                .attr('x', function (d, i) { 
                    return i * (viewWidth / filteredData.length);
                })
                .attr('y', function (d, i) { return yScale1(d); })
                .attr('width', dynamicBarWidth)
                .attr('height', function (d, i) { return yScale2(d); });
        };

        return that;
    },
    logClient: function(logFunction) {
        logFunction("some argument", 42);
    }
};

export default functions;


