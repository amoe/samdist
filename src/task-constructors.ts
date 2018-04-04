import {DisplayableTable} from './interfaces'

const tableBase = {
    successHandler: function (this: any, r) {
        const newData: DisplayableTable = {
            steppableColumns: [0],
            data: r.data
        };


        this.$store.commit('setTableData', newData);
    },
    resultComponent: 'tableWidget'
};

function makeTableTask(extension) {
    return Object.assign({}, tableBase, extension);
}

export default {
    makeTableTask
};
