<template>
  <div>
    <h1>Samdist</h1>

    <div v-if="error"
         class="alert alert-danger" role="alert">
      {{error.message}}
      <span class="close" v-on:click="dismiss">&#x274C;</span>
    </div>

    <svg v-if="inProgressCount > 0" height="3em" width="3em">
      <circle class="spinner"
              cx="50%"
              cy="50%"
              r="1em"
              stroke="black"
              stroke-width="0.1em"
              fill="#001f3f" />
    </svg> 
    
    <p>Ops in progress: {{inProgressCount}}</p>
    <p>Hi there!</p>
    <p>The value is: <code>{{count}}</code></p>
    <button v-on:click="greet">Greet</button>
    <button v-on:click="doIncrement">Inc</button>
    
    <bag-of-words-task></bag-of-words-task>
    <find-tags-task></find-tags-task>
    <display-selected-task></display-selected-task>

    <my-component :params="foobarFields"></my-component>

  </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import Vuex from 'vuex';
 import utility from '../utility';
 import BagOfWordsTask from './BagOfWordsTask.vue';
 import FindTagsTask from './FindTagsTask.vue';
 import DisplaySelectedTask from './DisplaySelectedTask.vue';
 import MyComponent from './MyComponent.vue';

 export default Vue.extend({
     components: {
         BagOfWordsTask, FindTagsTask, DisplaySelectedTask, MyComponent
     },
     data: function() {
         return {
             show: false,
             foobarFields: [
                 {name: 'age',
                  label: "Age",
                  mutation: 'updateAge'},
                 {name: 'age',
                  label: "Age",
                  mutation: 'updateAge'},
                 {name: 'favouriteFood',
                  label: "Favourite food",
                  mutation: 'updateFavouriteFood'}
             ]
         };
     },
     methods: {
         greet() {
             console.log("hello");
             console.log("state val is %o", this.$store.state.count);
         },
         doIncrement() {
             this.$store.dispatch('increment');
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
         error: function (this: any) {
             return this.$store.state.error;
         },
         inProgressCount: function (this: any) {
             return this.$store.state.inProgressCount
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

 h1,h2 { font-family: Georgia; }

 p, label { font-family: Arial, sans-serif; }

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

 .spinner {
     animation: pulse 1s infinite;
 }

 @keyframes pulse {
     0% {
         fill: #001f3f;
     }

     50% {
         fill: #ff4136;
     }

     100% {
         fill: #001f3f;
     }

 }
</style>
