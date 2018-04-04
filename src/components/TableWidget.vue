<template>
  <div>
    <h3>Results</h3>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in tableData.data">
        <td v-for="(column, index) in datum"
            v-on:click="stepThrough(column)"
            v-bind:class="isActive(tableData, index)">{{column}}</td>
      </tr>
    </table>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mutations from '../mutations';
import {DisplayableTable} from '../interfaces';
import * as _ from 'lodash';

export default Vue.extend({
    computed: {
        ... mapGetters(['tableData'])
    },
    methods: {
        stepThrough(column) {
            // Copy MATCH field to VALUE field.
            // Copy column to WORD field.

            this.$store.commit(mutations.STEP_WORD_THROUGH, column);
        },
        isActive(tableData: DisplayableTable, index) {
            const isSteppable = _.some(tableData.steppableColumns, i => i === index);

            return {
                'active-column-value': isSteppable
            }
        }
    }
});
</script>

<style>
td.active-column-value:hover {
    color: #a0a0a0;
}

td.active-column-value {
    text-decoration: underline;
}

</style>
