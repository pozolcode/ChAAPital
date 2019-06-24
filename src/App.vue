<template>
  <div id="app">
    <displayGeneral />
  </div>
</template>

<script>
import displayGeneral from './components/displayGeneral.vue'

export default {
  name: 'app',
  components: {
    displayGeneral
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
