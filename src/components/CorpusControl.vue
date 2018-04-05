<template>
  <div class="corpus-control">
    <p>Corpus: {{currentCorpus}}</p>
    
    <!-- <select> -->
    <!--   <option value="fnonl">fnonl</option> -->
    <!--   <option value="mnonl">mnonl</option> -->
    <!-- </select> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import axios from 'axios';

export default Vue.extend({
    created() {
        this.$store.dispatch('getCurrentCorpus');
    },
    computed: {
        ...mapGetters(['currentCorpus'])
    }
});  
</script>

<style>
</style>
