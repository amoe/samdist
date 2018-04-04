// steppableColumns is intended to simply name which columns can be stepped.
// It names the indices of data.
export interface DisplayableTable {
    steppableColumns: [number];
    data: any;
};

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

