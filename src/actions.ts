// actions.ts

const actions = {
    increment(context) {
        context.commit('increment')
    },
    submitBagOfWordsRequest() {
        console.log("submitting bag of words request");
    }
};

export default actions;
