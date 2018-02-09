<template>
<div>
  <h1>Samuels Tagger Explorer</h1>
  
  <dropdown-menu></dropdown-menu>

  <textarea>{{error}}</textarea>
  
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
  
  
  <generic-task :title="task.title"
                :description="task.description"
                :fields="task.fields"
                :run-action="task.runAction"
                :success-handler="task.successHandler"
                :result-component="task.resultComponent">
  </generic-task>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import utility from '../utility';
import DropdownMenu from './DropdownMenu.vue';
import BarChartDemo from './BarChartDemo.vue';
import GenericTask from './GenericTask.vue';
import taskDefinitions from  '../task-definitions';   

export default Vue.extend({
     components: {
         GenericTask, DropdownMenu
     },
     methods: {
         switchPane(this: any, code) {
             this.pane = code;
         },
         dismiss() {
             this.$store.commit('errorDismissed');
         }
     },
     // mapState doesn't work with typescript: "Property 'mapState' does not exist on type"
     // So we manually create the relevant computed properties.
    computed: {
        // construct the current task state from that which is requested
        'task': function(this: any) {
            if (!(this.visibleTask in taskDefinitions)) {
                throw new Error("unknown task definition");
            }
            
            return taskDefinitions[this.visibleTask];
        },
        ...mapGetters(['count', 'error', 'inProgressCount', 'visibleTask'])
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
    text-align: center;
}

nav.menu ul li {
    list-style: none;
    display: inline;
    padding-right: 1rem;
}

</style>
