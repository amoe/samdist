<template>
  <div class="bag-of-words-task">
    <label for="field">Field:</label>
    <input id="field" type="text" v-on:input="updateField" :value="field"/>

    <label for="cutoff">Cutoff:</label>
    <input id="cutoff" type="text" v-on:input="updateCutoff" :value="cutoff"/>
    
    <button v-on:click="run">Run</button>

    <p>Field name: <code>{{field}}</code></p>
    <p>Cutoff: <code>{{cutoff}}</code></p>
    
    <div id="chartContainer">
    </div>
  </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import utility from '../utility';

 export default Vue.extend({
     methods: {
         run() {
             // It's kind of cool to delegate policy aspects up the stack in this way.
             this.$store.dispatch('submitBagOfWordsRequest', {
                 field: this.field,
                 cutoff: this.cutoff
             }).then(r => this.$store.dispatch('drawGraph', r))
                 .catch(e => {
                     console.log("foo: %o", e);
                     utility.handleAxiosError(e);
                     this.$store.dispatch('handleError', e)
                 });
         },
         updateField(e) {
             // this doesn't need an action
             this.$store.commit('updateField', e.target.value);
         },
         updateCutoff(e) {
             this.$store.commit('updateCutoff', e.target.value);
         }
     },
     computed: {
         field: function (this: any) {
             return this.$store.state.field;
         },
         cutoff: function (this: any) {
             return this.$store.state.cutoff;
         }
     }
 });
</script>
