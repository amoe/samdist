import {DisplayableTable} from './interfaces'

function makeTableTask() {
    return {
        title: "Find words by semantic tag",
        description: `
          This will turn up individual words related to a particular semantic tag,
          and present the occurrence / prevalence stats.
        `,
        fields: [
            {
                name: 'tagMatch',
                label: 'Match',
                mutation: 'updateTagMatch',
                getter: 'tagMatch'
            },
            {
                name: 'tagField',
                label: 'Match field',
                mutation: 'updateTagField',
                getter: 'tagField'
            },
        ],
        runAction: 'submitFindWordsBySemanticTagRequest',
        successHandler: function (this: any, r) {
            const newData: DisplayableTable = {
                steppableColumns: [0],
                data: r.data
            };


            this.$store.commit('setTableData', newData);
        },
        resultComponent: 'tableWidget'
    };
}

export default {
    makeTableTask
};
