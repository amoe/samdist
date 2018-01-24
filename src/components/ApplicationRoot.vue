<template>
  <div>
    <p>Hi there!</p>
    <button v-on:click="greet">Greet</button>
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
         }
     },
     // mapState doesn't work with typescript: "Property 'mapState' does not exist on type"
     // So we manually create the relevant computed properties.
     computed: {
         count: function (this: any) {
             return this.$store.state.count;
         }
     }
 });
</script>

<style>
p { color: blue; }
</style>
