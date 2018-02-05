<template>
  <div>
    <h2>{{title}}</h2>

    <div v-for="field in fields">
      <label :for="field.name">{{field.label}}</label>
      <input type="text"
             :id="field.name"
             :name="field.name"
             :value="retrieve(field.getter)"
             :title="field.tooltip"
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
import {snakeCase} from 'lodash';

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
        createPayload() {
            const payload = this.fields.reduce(
                (acc, item) => {
                    acc[snakeCase(item.name)] = this.retrieve(item.getter);
                    return acc;
                },
                {}
            );
            
            return payload;
        },
        run(this: any) {
            const payload = this.createPayload();
            this.performNetworkOperation(
                this.runAction, payload, r => this.successHandler(r)    // arrow needed to bind this
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
