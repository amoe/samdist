<template>
  <div class="task">
    <h2>Find nearest neighbours</h2>

    <p>
      Find the nearest neighbours for the concept, listed by distance, 
      (optionally) within a given relation.
    </p>

    <form-field name="tagMatch" mutation="updateTagMatch" label="Concept"/>
    <form-field name="relation" mutation="updateRelation" label="Relation"/>
    
    <button type="submit" v-on:click="run">Run</button>

    <p>Tag match: <code>{{tagMatch}}</code></p>
    <p>Relation: <code>{{relation}}</code></p>

    <table class="amoe-table">
      <tr>
        <th>Concept</th>
        <th>Distance</th>
      </tr>
      <tr v-for="datum in findNearestNeighboursData">
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
               'submitFindNearestNeighboursRequest', {
                    'tag_match': this.tagMatch,
                    'relation': this.relation
                }, r => {
                    this.$store.commit('setFindNearestNeighboursData', r.data)
                }
            );
        }
    },
    computed: mapGetters(['tagMatch', 'relation', 'findNearestNeighboursData'])
});
</script>
