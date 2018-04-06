<template>
  <div class="corpus-control">
    <label for="corpus-select">Corpus:</label>
    <select v-on:change="changeCorpus($event)" id="corpus-select">
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
        },
        changeCorpus(event) {
            this.$store.dispatch('changeCurrentCorpus', event.target.value);
        }
    },
    computed: {
        ...mapGetters(['currentCorpus', 'availableCorpora'])
    }
});  
</script>

<style>
select {
    padding: 0.2rem 0.8rem 0rem 0rem;
    color: #1a1110;               /* off black */
    background-color: #fdfdfd;    /* off white, transparent same as background */
    border: 1px solid #a0a0a0;    /* SHL grey */
    border-radius: 0.2rem;
}
</style>
