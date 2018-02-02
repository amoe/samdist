<template>
  <div>
    <h2>{{title}}</h2>

    <div v-for="field in fields">
      <label :for="field.name">{{field.label}}</label>
      <input type="text"
             :id="field.name"
             :name="field.name"
             :value="retrieve(field.getter)"
             v-on:input="handleInput($event, field.mutation)"/>
    </div>

    <button type="submit" v-on:click="run">Run</button>

    <component :is="resultComponent">
    </component>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
import utility from '../utility';
import mixins from '../mixins';
import ChartWidget from './ChartWidget.vue';
import TableWidget from './TableWidget.vue';

export default Vue.extend({
    mixins: [mixins.main],
    props: [
        'title', 'fields', 'runAction', 'successHandler', 'resultComponent'
    ],
    components: {
        'chartWidget': ChartWidget,
        'tableWidget': TableWidget
    },
    methods: {
        run(this: any) {

            this.performNetworkOperation(
                this.runAction, {
                    field: this.field,
                    cutoff: this.cutoff
                }, r => this.successHandler(r)    // arrow needed to bind this
            );
        },
        handleInput(event, mutation) {
            this.$store.commit(mutation, event.target.value);
        },
        // this.$store.getters has some magic that makes it appear as a
        // pre-evaluated object, so we don't need to explicitly invoke
        // the getter.
        //
        // This method defeats caching, though.
        retrieve(paramName) {
            return this.$store.getters[paramName];
        }
    }
})
</script>
