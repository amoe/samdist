<template>
  <div>
    <h1>Samdist</h1>

    <div v-if="error"
         class="alert alert-danger" role="alert">
      {{error.message}}
      <span class="close" v-on:click="dismiss">&#x274C;</span>
    </div>
    
    
    <p>Hi there!</p>
    <p>The value is: <code>{{count}}</code></p>
    <button v-on:click="greet">Greet</button>
    <button v-on:click="doIncrement">Inc</button>

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
 import Vuex from 'vuex';

 export default Vue.extend({
     methods: {
         greet() {
             console.log("hello");
             console.log("state val is %o", this.$store.state.count);
         },
         doIncrement() {
             this.$store.dispatch('increment');
         },
         run() {
             // It's kind of cool to the policy up the stack in this way.
             this.$store.dispatch('submitBagOfWordsRequest', {
                 field: this.field,
                 cutoff: this.cutoff
             }).then(r => this.$store.dispatch('drawGraph', r))
                 .catch(e => {
                     console.log("foo");
                     this.$store.dispatch('handleError', e)
                 });
         },
         updateField(e) {
             // this doesn't need an action
             this.$store.commit('updateField', e.target.value);
         },
         updateCutoff(e) {
             this.$store.commit('updateCutoff', e.target.value);
         },
         dismiss() {
             this.$store.commit('errorDismissed');
         }
     },
     // mapState doesn't work with typescript: "Property 'mapState' does not exist on type"
     // So we manually create the relevant computed properties.
     computed: {
         count: function (this: any) {
             return this.$store.state.count;
         },
         field: function (this: any) {
             return this.$store.state.field;
         },
         cutoff: function (this: any) {
             return this.$store.state.cutoff;
         },
         error: function (this: any) {
             return this.$store.state.error;
         }
     }
 });
</script>

<style>

 body {
     max-width: 64rem;
     margin-left: auto;
     margin-right: auto;
     background-color: #fdfdfd;
 }

 h1 { font-family: Georgia; }

 p { font-family: Arial, sans-serif; }

 div.alert {
     border-radius: 0.25rem;
     border: 1px solid;
     padding: 0.75rem 1.25rem;
     display: flex;
     justify-content: space-between;
 }

 div.alert-danger {
     color: #721c24;
     background-color: #f8d7da;
     border-color: #f5c6cb;
 }

span.close {
    cursor: pointer;
}
</style>
