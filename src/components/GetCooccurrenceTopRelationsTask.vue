<template>
  <div class="task">
    <h2>Top cooccurrence relations</h2>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Tag match"/>
    <form-field name="tagField" mutation="updateTagField" label="Tag field"/>
    <form-field name="cutoff" mutation="updateCutoff" label="Cutoff"/>

    <p>{{tagMatch}}</p>
    <p>{{tagField}}</p>
    <p>{{cutoff}}</p>

    <button type="submit" v-on:click="run">Run</button>

    <div id="chartContainer4">
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
                 'submitCooccurrenceTopRelationsRequest', {
                     'tag_match': this.tagMatch,
                     'tag_field': this.tagField,
                     'cutoff': this.cutoff
                 }, r => {
                     this.$store.dispatch('drawCooccurrenceTopRelationsGraph', r)
                 }
             );
         }
     },
     computed: mapGetters(
         [
             'tagMatch', 'tagField', 'relation', 'window', 'cutoff',
             'cooccurrenceTopRelationsData'
         ]
     )
});
</script>

<style>
</style>
