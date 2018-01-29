<template>
  <div>
    This is a MyComponent instance.

    <div v-for="param in params">
      <label :for="param.name">{{param.label}}:</label>
      <input type="text"
             v-on:input="handleInput($event, param.mutation)"
             :id="param.name"
             :value="retrieve(param.name)"/>
    </div>
  </div>
</template>

<script>
 export default {
     props: ['params'],
     methods: {
         handleInput(event, mutation) {
             this.$store.commit(mutation, event.target.value);
         },
         retrieve(paramName) {
             return this.$store.state[paramName];
         }
     }
 };
</script>

<style>
</style>
