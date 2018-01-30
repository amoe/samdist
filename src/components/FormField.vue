<template>
  <div class="form-field">
    <label :for="name">{{label}}:</label>
    <input type="text"
           v-on:input="handleInput($event, mutation)"
           :id="name"
           :value="retrieve(name)"/>
  </div>
</template>

<script>
 export default {
     props: ['name', 'mutation', 'label'],
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
div.form-field {
    margin: 0rem 1rem 0rem 1rem;
    display: inline;
}
</style>
