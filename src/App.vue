<template>
  <div id="app">
    <div class="view-selector" v-if="generalView">
      <div class="container">
        <!-- User UX Row --> 
        <div class="row">
          <div class="col-12">
            <button @click="displayUser = true; generalView = false;">Vista Usuario</button>
          </div>
        </div>
        <!-- General Display UX Row -->
      </div>
    </div>
    <div v-else-if="displayUser">
      <displayUsuario />
    </div>
  </div>
</template>

<script>
import displayUsuario from './components/displayUsuario.vue'

export default {
  name: 'app',
  components: {
    displayUsuario
  },
  data: function () {
    return {
      generalView: true,
      displayUser: false
    }
  }
}
</script>

<style lang="scss">
@import url("../public/assets/css/tejuino/tejuino.css");

body {
  background-color: #efefef;
  font-size: 4rem;
}

.row {
  margin: 7.5% 0;
  justify-content: center;
  text-align: center;
  margin: 2.5% 0;
}
</style>
