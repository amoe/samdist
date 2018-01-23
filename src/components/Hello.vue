<template>
  <div>
    <p>Hi there!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        greet() {
            console.log("hello");
        }
    }
});
</script>

<style>
p { color: blue; }
</style>
