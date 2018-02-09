export interface DiscreteStatistic {
    category: string;
    value: number;
};

export interface ChartDrawRequest {
    data: any;
    yTitle: string;
    xTitle: string;
};

type JulieweStatisticalUnit = [string, number];
export type JulieweStatisticsList = [JulieweStatisticalUnit];

