<template>
<div class="task">
  <h2>{{title}}</h2>
  
  <p>{{description}}</p>
  
  <div class="input-set">
    <div v-for="field in fields">
      <label :for="field.name">{{field.label}}</label>
      <input type="text"
             :id="field.name"
             :name="field.name"
             :value="retrieve(field.getter)"
             :title="field.tooltip"
             v-on:input="handleInput($event, field.mutation)"/>
    </div>
  </div>
  
  <div class="control">
    <button type="submit" v-on:click="run">Run</button>
  </div>

  <div v-if="resultComponent === 'chartWidget'">
    <chart-widget v-if="haveChartData"
                  :points="chartData"
                  :outer-width="outerWidth"
                  :outer-height="outerHeight"
                  v-on:x-label-clicked="onXLabelClicked">
    </chart-widget>
  </div>
  <div v-else-if="resultComponent === 'tableWidget'">
    <table-widget v-if="haveTableData">
    </table-widget>
  </div>
  <div v-else>
    <p>Somehow found an unexpected thing</p>
  </div>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import utility from '../utility';
import mixins from '../mixins';
import ChartWidget from './ChartWidget.vue';
import TableWidget from './TableWidget.vue';
import {snakeCase} from 'lodash';
import thing from 'vue-barchart';
import mc from '../mutation-constants';

export default Vue.extend({
    mixins: [mixins.main],
    props: [
        'title', 'fields', 'runAction', 'successHandler', 'resultComponent',
        'description'
    ],
    components: {
        'chartWidget': thing.BChart,
        'tableWidget': TableWidget,
    },
    created: function () {
        console.log("inside component generic task: %o");
    },
    data: function() {
        return {
            outerWidth: 500,
            outerHeight: 500
        };
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
        },
        onXLabelClicked(category) {
            console.log("foo in parent: %o", category);

            // Now we need to issue some sort of mutation that will step through
            // the value.
            // We just assume that the field is vard.
            // So we just NULL out 'value', or make it blank; then write the category
            // to WORD.

            this.$store.commit(mc.STEP_WORD_THROUGH, category);
        }
    },
    computed: {
        dynamicResultProps(this: any) {
            if (this.resultComponent == 'chartWidget') {
                return {
                    outerWidth: 500,
                    outerHeight: 500,
                    points: this.chartData
                };
            } else {
                return {};
            }
        },
        haveChartData(this: any) {
            return this.chartData !== null;
        },
        haveTableData(this: any) {
            return this.tableData !== null;
        },
        ...mapGetters(['chartData', 'tableData'])
    }
})
</script>

<style>
div.input-set {
    display: grid;
    grid-column-gap: 0.1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
}

div.control {
    margin: 1rem 0 1rem 0;
}


div.input-set label {
    font-weight: bold;

    /* Force a line-break between the label and the associated field */
    /* Difference only be visible under some browser/OS combinations */
    display: block;
}

div.input-set input {
    margin-top: 0.2rem;
}
</style>
