<template>
  <div class="task">
    <h2>Compare corpora & find surprises</h2>

    <p>Corpus key must be a key within the set of known corpora.</p>
    <p>Measure can be llr, pmi, kl, jsd</p>

    <form-field name="corpusKey" mutation="updateCorpusKey" label="Corpus key"/>
    <form-field name="measure" mutation="updateMeasure" label="Measure"/>
    <form-field name="field" mutation="updateField" label="Field"/>
    <form-field name="cutoff" mutation="updateCutoff" label="Cutoff" type="number"/>

    <button type="submit" v-on:click="run">Run</button>

    <p>{{corpusKey}}</p>
    <p>{{measure}}</p>
    <p>{{field}}</p>
    <p>{{cutoff}}</p>

    <!-- table cell here should probably be refactored to a component, then we
         can encapsulate probability formatting within a getter -->
    <table class="amoe-table">
      <tr>
        <th>Word</th>
        <th>Score</th>
      </tr>
      <tr v-for="datum in compareCorporaData">
        <td>{{datum[0]}}</td>
        <td>{{datum[1]}}</td>
      </tr>
    </table>
    
    <div id="chartContainer3"> </div>
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
    components: {FormField},
    methods: {
        run(this: any) {
            this.performNetworkOperation(
                'submitCompareCorporaRequest', {
                    'corpus_key': this.corpusKey,
                    'measure': this.measure,
                    'field': this.field,
                    'cutoff': this.cutoff
                }, r => {
                    console.log("data is %o", r.data);
                    this.$store.commit('setCompareCorporaData', r.data)
                    this.$store.dispatch('drawCompareCorporaGraph', r)

                }
            );
        }
    },
    computed: mapGetters([
        'corpusKey', 'measure', 'field', 'cutoff', 'compareCorporaData'
    ])
});
</script>

<style>
td.candidate {
    font-size: xx-small;
    font-family: monospace
}
</style>
