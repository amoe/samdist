<template>
  <div class="task">
    <h2>Find words by semantic tag</h2>

    <p>
      This will look up words by a particular semantic tag, and present
      the occurence / prevalence stats.
    </p>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Tag match"/>
    <form-field name="tagField" mutation="updateTagField" label="Tag field"/>
    
    <button v-on:click="run">Run</button>

    <p>Tag match: <code>{{tagMatch}}</code></p>
    <p>Tag field: <code>{{tagField}}</code></p>

    <table class="amoe-table">
      <tr>
        <th>Word</th>
        <th>Count</th>
      </tr>
      <tr v-for="datum in findWordsBySemanticTagData">
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
               'submitFindWordsBySemanticTagRequest', {
                    tag_match: this.tagMatch,
                    tag_field: this.tagField
                }, r => {
                    this.$store.commit('setFindWordsBySemanticTagData', r.data)
                }
            );
        }
    },
    computed: mapGetters(['tagMatch', 'tagField', 'findWordsBySemanticTagData'])
});
</script>
