<template>
  <div class="task">
    <h2>Find Tags</h2>

    <label for="field">Field:</label>
    <input id="field" type="text" v-on:input="updateField" :value="field"/>

    <label for="word">Word:</label>
    <input id="word" type="text" v-on:input="updateWord" :value="word"/>
    
    <button v-on:click="run">Run</button>

    <p>Word: <code>{{word}}</code></p>
    <p>Field name: <code>{{field}}</code></p>
  </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import utility from '../utility';

 export default Vue.extend({
     methods: {
         run() {
             // It's kind of cool to delegate policy aspects up the stack in this way.
             this.$store.dispatch('submitFindTasksRequest', {
                 field: this.field,
                 word: this.word
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
         },
         updateField(e) {
             // this doesn't need an action
             this.$store.commit('updateField', e.target.value);
         },
         updateWord(e) {
             this.$store.commit('updateWord', e.target.value);
         }
     },
     computed: {
         field: function (this: any) {
             return this.$store.state.task.findTags.field;
         },
         word: function (this: any) {
             return this.$store.state.task.findTags.word;
         }
     }
 });
</script>

<style>
</style>
