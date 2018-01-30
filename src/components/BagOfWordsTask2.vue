<template>
  <div class="task">
    <h2>Bag of Words v2</h2>

    <single-form-field name="field" mutation="updateField" label="Field"/>
    <single-form-field name="cutoff" mutation="updateCutoff" label="Cutoff"/>

    <p>{{field}}</p>
    <p>{{cutoff}}</p>

    <button v-on:click="run">Run</button>
    <div id="chartContainer">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import SingleFormField from './SingleFormField.vue';
import { mapGetters } from 'vuex';
import mixins from '../mixins';

 export default Vue.extend({
     mixins: [mixins.main],
     components: {
         SingleFormField
     },
     methods: {
         run(this: any) {
             this.performNetworkOperation(
                 'submitBagOfWordsRequest', {
                     field: this.field,
                     cutoff: this.cutoff
                 }, r => {
                     this.$store.dispatch('drawGraph', r)
                 }
             );
         }
     },
     computed: mapGetters(['field', 'cutoff'])
});
</script>

<style>
</style>
