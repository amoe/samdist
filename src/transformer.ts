import {DiscreteStatistic, JulieweStatisticsList} from './interfaces'

const publicExports = {
    transformFromNetwork: function (data: JulieweStatisticsList): DiscreteStatistic[] {
        return data.map(
            function (x) {
                return {
                    x: x[0] as string,
                    y: x[1] as number
                };
            }
        );
    }
};

export default publicExports;
