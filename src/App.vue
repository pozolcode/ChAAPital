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
        <div class="row">
          <div class="col-12">
            <button @click="displayGeneral = true; generalView = false">Vista General</button>
          </div>
        </div>
        <!-- Operator Display UX Row -->
        <div class="row">
          <div class="col-12">
            <button @click="displayOperator = true; generalView = false">Vista Operador</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="displayUser"><displayUser /></div>
    <div v-else-if="displayGeneral"><displayGeneral /></div>
    <div v-else-if="displayOperator"><displayOperador /></div>
  </div>
</template>

<script>
import displayUser from './components/DisplayUser/mainUser.vue'
import displayGeneral from './components/GeneralDisplay/mainGeneral.vue'
import displayOperador from './components/displayOperador.vue'

export default {
  name: 'app',
  components: {
    displayUser,
    displayGeneral,
    displayOperador
  },
  data: function () {
    return {
      generalView: true,
      displayUser: false,
      displayGeneral: false,
      displayOperator: false
    }
  }
}
</script>

<style lang="scss">
@import url("../public/assets/css/tejuino/tejuino.css");
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

* { font-family: 'Roboto', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', Arial, sans-serif }

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
