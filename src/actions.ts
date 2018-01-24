// actions.ts

import axios from 'axios';

const API_PREFIX = "/api";

const actions = {
    increment(context) {
        context.commit('increment')
    },
    submitBagOfWordsRequest(payload) {
        console.log("submitting bag of words request");
        axios.get(API_PREFIX + "/bag-of-words", {
            params: {
                field: payload.field,
                cutoff: payload.cutoff
            }
        }).then(function (response) {
            console.log("regular response");
        }).catch(function (error) {
            console.log("error response");
        });
    }
};

export default actions;
