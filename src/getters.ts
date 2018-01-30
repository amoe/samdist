const getters = {
    age(state, getters) {
        return state.age;
    },
    field(state, getters) {
        return state.field;
    },
    cutoff(state, getters) {
        return state.cutoff;
    },
    word(state, getters) {
        return state.word;
    },
    findTagsData(state, getters) {
        return state.findTagsData;
    },
    value(state, getters) {
        return state.value;
    },
    window(state, getters) {
        return state.window;
    },
    displaySelectedData(state, getters) {
        return state.displaySelectedData;
    },
    tagField(state, getters) {
        return state.tagField;
    },
    tagMatch(state, getters) {
        return state.tagMatch;
    },
    findBySemanticTagData(state, getters) {
        return state.findBySemanticTagData;
    }
};

export default getters;
