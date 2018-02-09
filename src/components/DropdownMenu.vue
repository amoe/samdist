<template>
<div>
<ul class="menu-toplevel">
  <li v-for="(category, index) in menus">
    <span v-on:click="toggleMenu(index)">{{category.name}} &#x25BE;</span>
    <ul v-show="category.expanded">
      <li v-for="item in category.content"
          v-on:click="activate(item)">{{item.name}}</li>
    </ul>
  </li>
</ul>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import FormField from './FormField.vue';
import { mapGetters } from 'vuex';
import mixins from '../mixins';
import mutations from '../constants';

// This component will modify the global state visibleTask.
// taskName refers to the key of the task, as defined in task-definitions.ts.

 export default Vue.extend({
     mixins: [mixins.main],
     components: {
         FormField
     },
     data: function () {
         return {
             menus: [
                 {
                     name: "Tag Search",
                     expanded: false,
                     content: [
                         {name: "Bag of words",
                          taskName: 'bagOfWords'},
                         {name: "Find text by semantic tag",
                          taskName: 'findTextBySemanticTag'},
                         {name: "Find words by semantic tag",
                          taskName: 'findWordsBySemanticTag'},
                     ],
                 },
                 {
                     name: "Word Search",
                     expanded: false,
                     content: [
                         {name: "Display Examples by Word",
                          taskName: "displayExamplesByWord"},
                         {name: "Find tags by word",
                          taskName: 'findTags'},
                     ]
                 },
                 {
                     name: "Similarity",
                     expanded: false,
                     content: [
                         {name: "Nearest Neighbours",
                          taskName: "findNearestNeighbours"}
                     ]
                 },
                 {
                     name: "Co-occurrence",
                     expanded: false,
                     content: [
                         {name: "Top features",
                          taskName: 'cooccurrenceTopFeatures'},
                         {name: "Top relations",
                          taskName: 'cooccurrenceTopRelations'},
                     ]
                 },
                 {
                     name: "Corpora Comparison",
                     expanded: false,
                     content: [
                         {name: "Compute Surprises",
                          taskName: 'computeSurprises'},

                     ]
                 },
             ]
         };
     },
     methods: {
         toggleMenu(index) {
             console.log("inside toggle handler, i = %o", index);
             this.menus[index].expanded = !(this.menus[index].expanded);
         },
         activate(item) {
             this.$store.commit(mutations.SWITCH_TASK, item.taskName);
         }
     }
});
</script>

<style>

/* all list items on both levels */
ul.menu-toplevel li {
    cursor: pointer;
}

ul.menu-toplevel > li {
    color: #ff5f00;
    
    /* This is crucial otherwise the 'li' child won't be treated as a proper
       grid-item. */
    list-style-type: none;
}

ul.menu-toplevel ul li {
    color: #5f3653;
    
}

ul.menu-toplevel {
    display: grid;
    grid-column-gap: 0.1rem;
    grid-template-columns: repeat(6, 1fr);
}
</style>
