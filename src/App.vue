<template>
  <div id="app">
    <displayUsuario />
  </div>
</template>

<script>
import displayUsuario from './components/displayUsuario.vue'

export default {
  name: 'app',
  components: {
    displayUsuario
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
