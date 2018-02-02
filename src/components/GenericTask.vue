<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import mixins from '../mixins';

export default Vue.extend({
    mixins: [mixins.main],
    props: ['title'],
    methods: {
        run(this: any) {
            console.log("running");
        }
    }
})
</script>
