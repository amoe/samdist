<template>
  <div class="task">
    <h2>Display Selected</h2>

    <label for="field">Field:</label>
    <input id="field" type="text" v-on:input="updateField" :value="field"/>

    <label for="value">Value:</label>
    <input id="value" type="text" v-on:input="updateValue" :value="value"/>

    <label for="window">Window:</label>
    <input id="window" type="text" v-on:input="updateWindow" :value="window"/>
    
    <button v-on:click="run">Run</button>

    <p>Word: <code>{{word}}</code></p>
    <p>Field name: <code>{{field}}</code></p>
    <p>Value: <code>{{value}}</code></p>
    <p>Window: <code>{{window}}</code></p>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in data">
        <td>{{datum}}</td>
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
             this.$store.dispatch('submitDisplaySelectedRequest', {
                 field: this.field,
                 value: this.value,
                 window: this.window,
                 word: this.word
             }).then(r => {
                 this.$store.commit('operationFinished');
                 console.log("foo: %o", JSON.stringify(r.data, null, 4));
                 this.$store.commit('setDisplaySelectedData', r.data);
             })
                 .catch(e => {
                     this.$store.commit('operationFinished');
                     console.log("foo: %o", e);
                     utility.handleAxiosError(e);
                     this.$store.dispatch('handleError', e)
                 });
         },
         // XXX refactor...
         updateWord(e) {
             // this doesn't need an action
             this.$store.commit('updateWord', e.target.value); // ???
         },
         updateField(e) {
             // this doesn't need an action
             this.$store.commit('updateField', e.target.value); // ???
         },
         updateValue(e) {
             this.$store.commit('updateValue', e.target.value);
         },
         updateWindow(e) {
             this.$store.commit('updateWindow', e.target.value);
         }

     },
     computed: {
         // It's kind of unclear what should be done about this because
         // the two tasks share the property of 'field' but not 'word' .  We don't
         // necessarily want to duplicate the updateField mutation, but not
         // sure that we want to go to vuex modules.
         word: function(this: any) {
             return this.$store.state.word;
         },
         field: function (this: any) {
             return this.$store.state.field;
         },
         value: function (this: any) {
             return this.$store.state.value;
         },
         window: function (this: any) {
             return this.$store.state.window;
         },
         data: function (this: any) {
             return this.$store.state.task.displaySelected.data;
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
