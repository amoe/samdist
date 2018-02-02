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
    
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
import utility from '../utility';
import mixins from '../mixins';

export default Vue.extend({
    mixins: [mixins.main],
    props: ['title', 'fields'],
    methods: {
        run(this: any) {
            console.log("running");
        },
        retrieve(paramName) {
            return null;
        }
    }
})
</script>
