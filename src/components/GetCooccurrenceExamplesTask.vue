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

    <table class="amoe-table">
      <tr>
        <th>Thing</th>
        <th>Another thing</th>
      </tr>
      <tr>
        <td>Foo</td>
        <td>
          <ul>
            <li>Fry</li>
            <li>Bender</li>
            <li>Leela</li>
          </ul>
        </td>
      </tr>
    </table>


    <!-- table cell here should probably be refactored to a component, then we
         can encapsulate probability formatting within a getter -->
    <table class="amoe-table">
      <tr>
        <th>Element 1</th>
        <th>Element 2</th>
        <th>Element 3</th>
      </tr>
      <tr v-for="datum in cooccurrenceExamplesData">
        <td class="candidate"><code>{{datum[0][0]}}</code></td>
        <td>{{datum[0][1]}}</td>
        <td>
          <ul>
            <li v-for="example in datum[1]"><code>{{example}}</code></li>
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
    font-family: monospace
}
</style>
