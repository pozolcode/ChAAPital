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

<style lang="scss">
@import url("../public/assets/css/tejuino/tejuino.css")
</style>
