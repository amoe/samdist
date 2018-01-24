export interface DiscreteStatistic {
    category: string;
    value: number;
};

type JulieweStatisticalUnit = [string, number];
type JulieweStatisticsList = [JulieweStatisticalUnit];
export type JulieweStatisticsAggregate = [number, JulieweStatisticsList];
