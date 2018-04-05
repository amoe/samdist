<template>
  <div class="corpus-control">
    <p>Corpus: {{currentCorpus}}</p>

    {{availableCorpora}}
    
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
        this.$store.dispatch('getAvailableCorpora');
    },
    computed: {
        ...mapGetters(['currentCorpus', 'availableCorpora'])
    }
});  
</script>

<style>
</style>
