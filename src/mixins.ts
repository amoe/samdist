import utility from './utility';

const main = {
    methods: {
        // onSuccess is an action name
        performNetworkOperation(
            this: any,
            actionName: string,
            payload: object,
            onSuccess: Function
        ) {
            this.$store.dispatch(actionName, {
                field: this.field,
                cutoff: this.cutoff
            }).then(r => {
                this.$store.commit('operationFinished');
                onSuccess(r);
            }).catch(e => {
                this.$store.commit('operationFinished');
                utility.handleAxiosError(e);
                this.$store.dispatch('handleError', e)
            });
        }
    }
};

export default {
    main
};
