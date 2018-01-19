import {DiscreteStatistic} from './interfaces'

const publicExports = {
    transformFromNetwork: function (data: any[][]): DiscreteStatistic[] {
        return data.map(
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
