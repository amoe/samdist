<template>
  <div class="task">
    <h2>Find Tags</h2>

    <form-field name="relation" mutation="updateRelation" label="Relation"/>
    <form-field name="semtagA" mutation="updateSemtagA" label="Tag A"/>
    <form-field name="semtagB" mutation="updateSemtagB" label="Tag B"/>
    
    <button v-on:click="run">Run</button>

    <p>Relation: <code>{{relation}}</code></p>
    <p>Tag A: <code>{{semtagA}}</code></p>
    <p>Tag B: <code>{{semtagB}}</code></p>

    <div clas="result">
      {{findSimilarityData}}
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import {mapGetters} from 'vuex';
import mixins from '../mixins';
import FormField from './FormField.vue';

export default Vue.extend({
    mixins: [mixins.main],
    components: {
        FormField
    },
    methods: {
        run(this: any) {
            this.performNetworkOperation(
                'submitFindSimilarityRequest', {
                    'relation': this.relation,
                    'semtag_a': this.semtagA,
                    'semtag_b': this.semtagB
                }, r => {
                    console.log("similarity value is %o", r.data);
                    this.$store.commit('setFindSimilarityData', r.data)
                }
            );
        }
    },
    computed: mapGetters(
        ['relation', 'semtagA', 'semtagB', 'findSimilarityData']
    )
});
</script>

