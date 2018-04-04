<template>
  <div>
    <h3>Results</h3>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in tableData.data">
        <span v-for="(column, index) in datum">
          <td v-if="isActive(tableData, index)"
              v-on:click="stepThrough(column)"
              class="active-column-value">{{column}}</td>

          <td v-else>{{column}}</td>
        </span>

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
            return isSteppable;
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

span {
    display: inline;
}

</style>
