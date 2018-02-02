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
