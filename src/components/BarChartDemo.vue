<template>
<div class="all-charts">
  <div id="dimple-chart-container"></div>
  
  <div class="my-chart">
    <svg width="500" height="500" viewBox="0 0 120 120"
         xmlns="http://www.w3.org/2000/svg">
      
      <rect x="10" y="10" width="100" height="100"/>
    </svg>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
import mixins from '../mixins';
import FormField from './FormField.vue';
import * as dimple from 'dimple';

export default Vue.extend({
    mixins: [mixins.main],
    data: function() {
        return {
            points: [
                {category: 'foo',
                 value: 1},
                {category: 'bar',
                 value: 2},
                {category: 'baz',
                 value: 3},
                {category: 'quux',
                 value: 4},
                {category: 'froz',
                 value: 5}
            ]
        };
    },
    mounted: function () {
        this.$nextTick(this.renderDimpleChart);
    },
    methods: {
        renderDimpleChart(this: any) {
            var svg = dimple.newSvg("#dimple-chart-container", 590, 400);
            
            const myChart = new dimple.chart(svg, this.points);
            myChart.setBounds(60, 30, 510, 305)
            const x = myChart.addCategoryAxis("x", 'category');
            x.addOrderRule("Date");
            myChart.addMeasureAxis("y", 'value');
            myChart.addSeries(null, dimple.plot.bar);
            myChart.draw();
        }
    }
});
</script>

<style>
</style>
