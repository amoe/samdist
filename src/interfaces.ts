export interface DiscreteStatistic {
    x: string;
    y: number;
};

export interface ChartDrawRequest {
    data: any;
    yTitle: string;
    xTitle: string;
};

type JulieweStatisticalUnit = [string, number];
export type JulieweStatisticsList = [JulieweStatisticalUnit];

