<template>
  <div>
    <h3>Results</h3>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in tableData">
        <td v-for="column in datum">{{column}}</td>
      </tr>
    </table>

  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';

export default Vue.extend({
    computed: mapGetters(['tableData'])
});
</script>
