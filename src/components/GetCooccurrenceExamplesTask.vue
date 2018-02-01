<template>
  <div class="task">
    <h2>Get example texts by cooccurrence</h2>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Tag match"/>
    <form-field name="tagField" mutation="updateTagField" label="Tag field"/>
    <form-field name="relation" mutation="updateRelation" label="Relation"/>
    <form-field name="window" mutation="updateWindow" label="Window"/>
    <form-field name="cutoff" mutation="updateCutoff" label="Cutoff"/>
    <form-field name="examples" mutation="updateExamples" label="Examples"/>

    <button type="submit" v-on:click="run">Run</button>

    <p>{{tagMatch}}</p>
    <p>{{tagField}}</p>
    <p>{{relation}}</p>
    <p>{{window}}</p>
    <p>{{cutoff}}</p>
    <p>{{examples}}</p>


    <!-- table cell here should probably be refactored to a component, then we
         can encapsulate probability formatting within a getter -->
    <table class="amoe-table">
      <tr>
        <th>Semantic relation</th>
        <th>PPMI score</th>
        <th>Example occurrences</th>
      </tr>
      <tr v-for="datum in cooccurrenceExamplesData">
        <td class="candidate"><code>{{datum[0][0]}}</code></td>
        <td>{{datum[0][1]}}</td>
        <td>
          <ul>
            <li class="example" v-for="example in datum[1]">{{example}}</li>
          </ul>
        </td>
      </tr>
    </table>
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
                'submitGetCooccurrenceExamplesRequest', {
                     'tag_match': this.tagMatch,
                     'tag_field': this.tagField,
                     'relation': this.relation,
                     'window': this.window,
                     'cutoff': this.cutoff,
                     'examples': this.examples
                }, r => {
                    console.log("examples data was: %o", JSON.stringify(r.data, null, 4));
                    this.$store.commit('setCooccurrenceExamplesData', r.data)
                }
            );
        }
    },
    computed: mapGetters([
        'tagMatch', 'tagField', 'relation', 'window', 'cutoff', 
        'examples', 'cooccurrenceExamplesData'
    ])
});
</script>

<style>
td.candidate {
    font-size: xx-small;
    font-family: monospace;
    background-color: rgba(160, 160, 160, 0);
                     
}

li.example {
    list-style: none;
    font-family: monospace;
    background-color: #a0a0a0;
    margin-bottom: 0.2rem;
}                     

</style>
