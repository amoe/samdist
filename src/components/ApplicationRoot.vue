<template>
  <div>
    <p>Hi there!</p>
    <p>The value is: <code>{{count}}</code></p>
    <button v-on:click="greet">Greet</button>
    <button v-on:click="doIncrement">Inc</button>

    <label for="field">Field:</label>
    <input id="field" type="text" value="SEMTAG3" v-on:input="updateField"/>

    <label for="cutoff">Cutoff:</label>
    <input id="cutofff" type="text" value="20"/>
    
    <button v-on:click="run">Run</button>

    <p>Field name: <code>{{field}}</code></p>
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
             console.log("running query");
         },
         updateField(e) {
             // this doesn't need an action
             this.$store.commit('updateField', e.target.value);
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
         }
     }
 });
</script>

<style>
p { color: blue; }
</style>
