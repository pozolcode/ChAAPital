<template>
  <div id="app">
    <displayOperador />
  </div>
</template>

<script>
import displayOperador from './components/displayOperador.vue'

export default {
  name: 'app',
  components: {
    displayOperador
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
