<template>
<ul class="menu-toplevel">
  <li v-for="(category, index) in menus">
    <span v-on:click="toggleMenu(index)">{{category.name}} &#x25BE;</span>
    <ul v-show="category.expanded">
      <li v-for="item in category.content"
          v-on:click="activate(item)">{{item.name}}</li>
    </ul>
  </li>
</ul>
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
             this.menus[index].expanded = !this.menus[index].expanded;
         },
         activate(item) {
             this.$store.commit(mutations.SWITCH_TASK, item.taskName);
         }
     }
});
</script>

<style>
ul.menu-toplevel li {
    display: inline;
    color: #ff5f00;
}

ul.menu-toplevel ul {
}

ul.menu-toplevel ul li {
    color: #5f3653;
    display: block;
}

</style>
