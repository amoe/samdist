<template>
  <div class="task">
    <h2>Display Selected</h2>


    <form-field name="word" mutation="updateWord" label="Word"/>
    <form-field name="field" mutation="updateField" label="Field"/>
    <form-field name="value" mutation="updateValue" label="Value"/>
    <form-field name="window" mutation="updateWindow" label="Window"/>

    <button v-on:click="run">Run</button>

    <p>Word: <code>{{word}}</code></p>
    <p>Field name: <code>{{field}}</code></p>
    <p>Value: <code>{{value}}</code></p>
    <p>Window: <code>{{window}}</code></p>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in displaySelectedData">
        <td>{{datum}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from '../utility';
import {mapGetters} from 'vuex';
import FormField from './FormField.vue';
import mixins from '../mixins';

export default Vue.extend({
    mixins: [mixins.main],
    components: {
        FormField
    },
    methods: {
        run(this: any) {
            this.performNetworkOperation(
                'submitDisplaySelectedRequest', {
                    field: this.field,
                    value: this.value,
                    window: this.window,
                    word: this.word
                }, r => {
                    this.$store.commit('setDisplaySelectedData', r.data)
                }
            );
        }
    },
    computed: mapGetters([
        'field', 'word', 'value', 'window', 'displaySelectedData'
    ])
});
</script>

<style>
table.amoe-table {
    width: 100%;
    margin-bottom: 1rem;
}

table.amoe-table td, th {
    padding: 0.75rem;
    border-top: 0.1rem solid #dee2e6;
}
</style>
