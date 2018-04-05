<template>
  <div class="corpus-control">
    <select>
      <option v-for="item in availableCorpora"
              :value="item"
              :selected="isSelected(item)">{{item}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import axios from 'axios';

export default Vue.extend({
    created() {
        this.$store.dispatch('getCurrentCorpus');
        this.$store.dispatch('getAvailableCorpora');
    },
    methods: {
        isSelected(item) {
            return item === this.currentCorpus;
        }
    },
    computed: {
        ...mapGetters(['currentCorpus', 'availableCorpora'])
    }
});  
</script>

<style>
</style>
