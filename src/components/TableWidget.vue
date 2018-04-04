<template>
  <div>
    <h3>Results</h3>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in tableData.data">
        <!--
            Creepy stuff going on here:
            The 'for' runs first, and the `v-if` runs as if scoped inside the for.
        -->
          <td v-for="(column, index) in datum"
              v-if="isActive(tableData, index)"
              v-on:click="stepThrough(column)"
              class="active-column-value">{{column}}</td>
          
          <td v-else>{{column}}</td>
      </tr>
    </table>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mc from '../mutation-constants';
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

            this.$store.commit(mc.STEP_WORD_THROUGH, column);
        },
        isActive(tableData: DisplayableTable, index) {
            console.log("steppable columns are %o", tableData.steppableColumns);
            const isSteppable = _.some(tableData.steppableColumns, i => i === index);
            console.log("steppable check returned %o", isSteppable);
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
