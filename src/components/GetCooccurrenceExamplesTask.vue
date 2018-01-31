<template>
  <div class="task">
    <h2>Get example texts by cooccurrence</h2>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Tag match"/>
    <form-field name="tagField" mutation="updateTagField" label="Tag field"/>
    <form-field name="relation" mutation="updateRelation" label="Relation"/>
    <form-field name="window" mutation="updateWindow" label="Window"/>
    <form-field name="cutoff" mutation="updateCutoff" label="Cutoff"/>

    <button v-on:click="run">Run</button>

    <p>{{tagMatch}}</p>
    <p>{{tagField}}</p>
    <p>{{relation}}</p>
    <p>{{window}}</p>
    <p>{{cutoff}}</p>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in cooccurrenceExamplesData">
        <td>{{datum}}</td>
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
                     'cutoff': this.cutoff
                }, r => {
                    this.$store.commit('setCooccurrenceExamplesData', r.data)
                }
            );
        }
    },
    computed: mapGetters([
        'tagMatch', 'tagField', 'relation', 'window', 'cutoff', 
        'cooccurrenceExamplesData'
    ])
});
</script>
