<template>
<div>
  <h1>Samuels Tagger Explorer</h1>
  
  <nav class="menu">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  
  <div v-if="error"
       class="alert alert-danger" role="alert">
    {{error.message}}
    <span class="close" v-on:click="dismiss">&#x274C;</span>
  </div>
  
  <svg v-if="inProgressCount > 0" height="3em" width="3em" class="spinner">
    <circle cx="50%"
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
  
  <bag-of-words-task/>
  <find-tags-task/>
  <display-selected-task/>
  <find-text-by-semantic-tag-task/>
  <find-words-by-semantic-tag-task/>
  <cooccurrence-top-features-task/>
  <get-cooccurrence-candidate-texts/>
  <get-cooccurrence-examples-task/>
  <find-similarity-task/>
  <find-nearest-neighbours-task/>
  <compare-corpora-task/>
  
  <h2>Generic tasks</h2>
  <section v-for="task in tasks">
    <generic-task :instance="task"/>
  </section>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
import BagOfWordsTask from './BagOfWordsTask.vue';
import FindTagsTask from './FindTagsTask.vue';
import DisplaySelectedTask from './DisplaySelectedTask.vue';
import FindWordsBySemanticTagTask from './FindWordsBySemanticTagTask.vue';
import FindTextBySemanticTagTask from './FindTextBySemanticTagTask.vue';
import CooccurrenceTopFeaturesTask from './CooccurrenceTopFeaturesTask.vue';
import GetCooccurrenceCandidateTexts from './GetCooccurrenceCandidateTexts.vue';
import GetCooccurrenceExamplesTask from './GetCooccurrenceExamplesTask.vue';
import FindSimilarityTask from './FindSimilarityTask.vue';
import FindNearestNeighboursTask from './FindNearestNeighboursTask.vue';
import CompareCorporaTask from './CompareCorporaTask.vue';
import taskDefinitions from '../task-definitions';
import GenericTask from './GenericTask.vue';

export default Vue.extend({
     components: {
         BagOfWordsTask, FindTagsTask, DisplaySelectedTask, 
         FindTextBySemanticTagTask, FindWordsBySemanticTagTask,
         CooccurrenceTopFeaturesTask, GetCooccurrenceCandidateTexts,
         GetCooccurrenceExamplesTask, FindSimilarityTask,
         FindNearestNeighboursTask, CompareCorporaTask, GenericTask
     },
     data: function() {
         return {
             show: false,
             tasks: taskDefinitions
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
@font-face {
    font-family: 'Oxygen';
    src: url("/static/fonts/Oxygen-Regular.ttf");
}

body {
    max-width: 64rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #fdfdfd;
    font-family: 'Oxygen', sans-serif;
}

h1,h2 { font-family: Georgia; }


div.alert {
    position: fixed;
    left: 0px;
    top: 0px;
    
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

svg.spinner {
    position: fixed;
    left: 0px;
    top: 0px;
}

svg.spinner circle {
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

/* Used for the table-based components, this is as simple as it gets */
table.amoe-table {
    width: 100%;
    margin-bottom: 1rem;
}

table.amoe-table td, th {
    padding: 0.75rem;
    border-top: 0.1rem solid #dee2e6;
}

nav.menu ul li {
    list-style: none;
    display: inline;
    padding-right: 1rem;
}

</style>
