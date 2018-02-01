<template>
  <div class="task">
    <h2>Find Tags</h2>

    <p>Use SEMTAG3 in the field to list common semantic tags assigned to certain
      words.</p>

    <form-field name="field" mutation="updateField" label="Field"/>
    <form-field name="word" mutation="updateWord" label="Word"/>
    
    <button type="submit" v-on:click="run">Run</button>

    <p>Word: <code>{{word}}</code></p>
    <p>Field name: <code>{{field}}</code></p>

    <table class="amoe-table">
      <tr>
        <th>{{field}}</th>
        <th>Count</th>
      </tr>
      <tr v-for="datum in findTagsData">
        <td>{{datum[0]}}</td>
        <td>{{datum[1]}}</td>
      </tr>
    </table>
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
    components: {
        FormField
    },
    methods: {
        run(this: any) {
            this.performNetworkOperation(
                'submitFindTagsRequest', {
                    field: this.field,
                    word: this.word
                }, r => {
                    this.$store.commit('setFindTagsData', r.data)
                }
            );
        }
    },
    computed: mapGetters(['field', 'word', 'findTagsData'])
});
</script>
