<template>
  <div>
    <h3>Some generic task: {{instance.name}}</h3>
    <button v-on:click="run">Run</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import {mapGetters} from 'vuex';
import mixins from '../mixins';
import FormField from './FormField.vue';

export default Vue.extend({
    mixins: [mixins.main],
    props: ['instance'],
    components: {
        FormField
    },
    methods: {
        run(this: any) {
            console.log("not implemented");
            console.log("task value is %o", this.instance);
        }
    },
    computed: this.instance.getGetters()
});

</script>
