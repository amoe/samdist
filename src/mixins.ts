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
            console.log("this is %o", this);
            console.log("actionName is %o", actionName);
            console.log("payload is %o", payload);
            console.log("onSuccess is %o", onSuccess);
            this.$store.dispatch(actionName, payload).then(r => {
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
