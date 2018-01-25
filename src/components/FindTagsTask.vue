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

    <table class="amoe-table">
      <tr>
        <th>{{field}}</th>
        <th>Count</th>
      </tr>
      <tr v-for="datum in data">
        <td>{{datum[0]}}</td>
        <td>{{datum[1]}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import utility from '../utility';

 export default Vue.extend({
     methods: {
         run() {
             // It's kind of cool to delegate policy aspects up the stack in this way.
             this.$store.dispatch('submitFindTagsRequest', {
                 field: this.field,
                 word: this.word
             }).then(r => {
                 this.$store.commit('operationFinished');
                 console.log("foo: %o", JSON.stringify(r.data, null, 4));
                 this.$store.commit('setFindTagsData', r.data);
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
             this.$store.commit('updateField', e.target.value); // ???
         },
         updateWord(e) {
             this.$store.commit('updateWord', e.target.value);
         }
     },
     computed: {
         // It's kind of unclear what should be done about this because
         // the two tasks share the property of 'field' but not 'word' .  We don't
         // necessarily want to duplicate the updateField mutation, but not
         // sure that we want to go to vuex modules.
         field: function (this: any) {
             return this.$store.state.field;
         },
         word: function (this: any) {
             return this.$store.state.task.findTags.word;
         },
         data: function (this: any) {
             return this.$store.state.task.findTags.data;
         }
     }
 });
</script>

<style>
table.amoe-table {
    width: 100%;
    margin-bottom: 1rem;
}

table.amoe-table td, th {
    padding: 0.75rem;
    border-top: 0.1rem solid #dee2e6;
}
</style>
