const publicExports = {
    transformFromNetwork: function (data: any[][]): number[] {
        return data.map(x => x[1] as number);
    }
};

export default publicExports;
