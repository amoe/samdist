<template>
  <div class="task">
    <h2>Find by semantic tag filtering</h2>

    <p>
      This view will filter on semantic tag values and then filter again by
      a given field/value combination.
    </p>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Tag match"/>
    <form-field name="tagField" mutation="updateTagField" label="Tag field"/>
    <form-field name="field" mutation="updateField" label="Search field"/>
    <form-field name="value" mutation="updateValue" label="Search value"/>
    <form-field name="window" mutation="updateWindow" label="Window"/>
    <form-field name="cutoff" mutation="updateCutoff" label="Cutoff"/>

    <button v-on:click="run">Run</button>

    <p>Semantic tag match: <code>{{tagMatch}}</code></p>
    <p>Semantic tag field: <code>{{tagField}}</code></p>
    <p>Search field: <code>{{field}}</code></p>
    <p>Search value: <code>{{value}}</code></p>
    <p>Window: <code>{{window}}</code></p>
    <p>Cutoff: <code>{{cutoff}}</code></p>

    <table class="amoe-table">
      <tr>
        <th>Text</th>
      </tr>
      <tr v-for="datum in findBySemanticTagData">
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
                'submitFindBySemanticTagRequest', {
                    'tag_match': this.tagMatch,
                    'tag_field': this.tagField,
                    'field': this.field,
                    'value': this.value,
                    'window': this.window,
                    'cutoff': this.cutoff
                }, r => {
                    this.$store.commit('setFindBySemanticTagData', r.data)
                }
            );
        }
    },
    computed: mapGetters([
        'field', 'word', 'value', 'window', 'cutoff', 'findBySemanticTagData',
        'tagMatch', 'tagField'
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
