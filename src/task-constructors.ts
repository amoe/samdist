import { DisplayableTable } from './interfaces'

function makeSuccessHandler(steppableColumns) {
    return function(this: any, r) {
        const newData: DisplayableTable = {
            steppableColumns,
            data: r.data
        };


        this.$store.commit('setTableData', newData);
    };
}

function makeTableTask(extension, steppableColumns) {
    return Object.assign(
        {},
        {
            successHandler: makeSuccessHandler(steppableColumns),
            resultComponent: 'tableWidget'
        },
        extension
    );
}

export default {
    makeTableTask
};
