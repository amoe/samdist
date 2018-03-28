<template>
  <div>
    <h3>Results</h3>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in tableData">
        <td v-for="column in datum"
            v-on:click="stepThrough(column)"
            class="active-column-value">{{column}}</td>
      </tr>
    </table>

  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mutations from '../mutations';

export default Vue.extend({
    computed: mapGetters(['tableData']),
    methods: {
        stepThrough(column) {
            // Copy MATCH field to VALUE field.
            // Copy column to WORD field.

            this.$store.commit(mutations.STEP_WORD_THROUGH, column);
        }
    }
});
</script>

<style>
td.active-column-value:hover {
    color: #a0a0a0;
}
</style>
