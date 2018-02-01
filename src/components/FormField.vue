<template>
  <div class="form-field">
    <label :for="name">{{label}}:</label>
    <input :type="type"
           v-on:input="handleInput($event, mutation)"
           :id="name"
           :value="retrieve(name)"/>
  </div>
</template>

<script>
 export default {
     props: {
         'name': {type: String},
         'mutation': {type: String},
         'label': {type: String},
         'type': {
             type: String,
             default: 'text'
         }
     },
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
    margin: 0rem 1rem 1rem 1rem;
    display: inline;
}

div.form-field label {
    margin-right: 0.4rem;
}
</style>
