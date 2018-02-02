<template>
  <ul class="menu-toplevel">
    <li v-for="(category, index) in menus">
      <span v-on:click="toggleMenu(index)">{{category.name}}</span>
      <ul v-show="category.shown">
        <li v-for="item in category.content">{{item.name}}</li>
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

 export default Vue.extend({
     mixins: [mixins.main],
     components: {
         FormField
     },
     data: function () {
         return {
             menus: [
                 {
                     name: "Mammals",
                     shown: false,
                     content: [
                         {name: "Cows"},
                         {name: "Rodents"},
                         {name: "Sheep"}
                     ]
                 },
                 {
                     name: "Reptiles",
                     shown: false,
                     content: [
                         {name: "Crocodiles"},
                         {name: "Lizards"},
                         {name: "Snakes"}
                     ]
                 },
             ]
         };
     },
     methods: {
         run(this: any) {
             this.performNetworkOperation(
                 'submitBagOfWordsRequest', {
                     field: this.field,
                     cutoff: this.cutoff
                 }, r => {
                     this.$store.dispatch('drawGraph', r)
                 }
             );
         },
         toggleMenu(this: any, index) {
             console.log("toggling index: %o", index);
             this.menus[index].shown = !this.menus[index].shown;
         }
     },
     computed: mapGetters(['field', 'cutoff'])
});
</script>

<style>
ul.menu-toplevel li {
    display: inline;
}

ul.menu-toplevel ul {
    color: red;
}

ul.menu-toplevel ul li {
    display: block;
}

</style>
