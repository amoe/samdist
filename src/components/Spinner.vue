<template>
  <svg v-if="inProgressCount > 0" height="3em" width="3em" class="spinner">
    <circle cx="50%"
            cy="50%"
            r="1em"
            stroke="black"
            stroke-width="0.1em"
            fill="#001f3f" />
  </svg> 
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
     computed: mapGetters(['inProgressCount'])
});
</script>

<style>
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
</style>
