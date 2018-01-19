import * as d3 from 'd3';
import * as log from 'loglevel';
import {DiscreteStatistic} from './interfaces';

const functions = {
    drawBarChart: function(data: DiscreteStatistic[], cutoff?: number) {
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

        const xScale = d3.scaleBand()
            .domain(
                filteredData.map(function (d) { return d.category; })
            ).rangeRound([0, viewWidth])
            .paddingInner(0.1)
            .paddingOuter(0.8);

        const yDomainMax = d3.max(filteredData, x => x.value);

        // because y increases as the data value gets smaller, the range must
        // be different on this one -- see the reversed arguments in range()
        const yScale1 = d3.scaleLinear()
          .domain([0, yDomainMax])
          .range([viewHeight, 0]);

        const yScale2 = d3.scaleLinear()
          .domain([0, yDomainMax])
          .range([0, viewHeight]);

        log.debug("bandwidth calced as %o", xScale.bandwidth());

        var xAxis = d3.axisBottom(xScale)
	    .tickSizeInner(4)
    	    .tickSizeOuter(20)
	    .tickPadding(3);
    
        that.render = function() {
            var svg = d3.select('.container')
                .append('svg')
                .attr('viewBox', "0 0 " + viewWidth + " " + viewHeight)
                .attr('preserveAspectRatio', 'xMinYMin meet');

            svg.selectAll('rect')
                .data(filteredData)
                .enter()
                .append('rect')
                .attr('x', function (d, i) { 
                    return xScale(d.category);
                })
                .attr('y', function (d, i) { 
                    return yScale1(d.value);
                })
                .attr('width', xScale.bandwidth())
                .attr('height', function (d, i) { return yScale2(d.value); });

            svg.append('g')
                .attr('transform', "translate(0, " + (viewHeight - 10) + ")")
                .call(xAxis);
        };

        return that;
    },
    logClient: function(logFunction) {
        logFunction("some argument", 42);
    }
};

export default functions;


