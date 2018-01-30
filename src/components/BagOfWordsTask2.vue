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

 export default Vue.extend({
     components: {
         SingleFormField
     },
     methods: {
         run() {
             // It's kind of cool to delegate policy aspects up the stack in this way.
             this.$store.dispatch('submitBagOfWordsRequest', {
                 field: this.field,
                 cutoff: this.cutoff
             }).then(r => {
                 this.$store.commit('operationFinished');
                 this.$store.dispatch('drawGraph', r)
             })
                 .catch(e => {
                     this.$store.commit('operationFinished');
                     console.log("foo: %o", e);
                     utility.handleAxiosError(e);
                     this.$store.dispatch('handleError', e)
                 });
         }
     },
     computed: mapGetters(['field', 'cutoff'])
});
</script>

<style>
</style>
