import {DiscreteStatistic, JulieweStatisticsAggregate} from './interfaces'

const publicExports = {
    transformFromNetwork: function (data: JulieweStatisticsAggregate): DiscreteStatistic[] {
        // discard the first item and pull out the second
        const realData = data[1];
        
        return realData.map(
            function (x) {
                return {
                    category: x[0] as string,
                    value: x[1] as number
                };
            }
        );
    }
};

export default publicExports;
