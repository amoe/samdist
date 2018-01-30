<template>
  <div class="task">
    <h2>Cooccurrence top features chart</h2>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Tag match"/>
    <form-field name="tagField" mutation="updateTagField" label="Tag field"/>
    <form-field name="relation" mutation="updateRelation" label="Relation"/>
    <form-field name="window" mutation="updateWindow" label="Window"/>
    <form-field name="cutoff" mutation="updateCutoff" label="Cutoff"/>

    <p>{{tagMatch}}</p>
    <p>{{tagField}}</p>
    <p>{{relation}}</p>
    <p>{{window}}</p>
    <p>{{cutoff}}</p>

    <button v-on:click="run">Run</button>

    <div id="chartContainer2">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import FormField from './FormField.vue';
import { mapGetters } from 'vuex';
import mixins from '../mixins';

 export default Vue.extend({
     mixins: [mixins.main],
     components: {
         FormField
     },
     methods: {
         run(this: any) {
             this.performNetworkOperation(
                 'submitCooccurrenceTopFeaturesRequest', {
                     'tag_match': this.tagMatch,
                     'tag_field': this.tagField,
                     'relation': this.relation,
                     'window': this.window,
                     'cutoff': this.cutoff
                 }, r => {
                     console.log("cooccurrence data was %o", JSON.stringify(r.data, null, 4));
                     this.$store.dispatch('drawCooccurrenceGraph', r)
                 }
             );
         }
     },
     computed: mapGetters(
         ['tagMatch', 'tagField', 'relation', 'window', 'cutoff']
     )
});
</script>

<style>
</style>
