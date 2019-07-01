<template>
  <div class="page">
    <!-- LogIn Menu -->
    <div class="container login" v-if="!logged">
      <div class="row">
        <div class="col-12">Usuario</div>
        <div class="col-12">
          <input type="text" v-model="user">
        </div>
      </div>
      <div class="row">
        <div class="col-12">Contraseña</div>
        <div class="col-12">
          <input type="password" v-model="password">
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button @click="login">Send</button>
        </div>
      </div>
    </div>
    <!-- Operator Display Menu -->
    <div class="container operator-menu" v-else-if="logged">
      <!-- Welcome Row -->
      <div class="row">
        <div class="col-5 welcome">Bienvenido Operador</div>
      </div>
      <!-- Current Turn Row -->
      <div class="row">
        <div class="col-5">Atendiendo Turno {{ dataTurn }}</div>
      </div>
      <!-- Company Data Row -->
      <div class="row">
        <div class="col-5">Armadora: {{ dataCompany }}</div>
      </div>
      <!-- Model Data Row -->
      <div class="row">
        <div class="col-5">Modelo: {{ dataModel }}</div>
      </div>
      <!-- Year Data Row -->
      <div class="row">
        <div class="col-5">Año: {{ dataYear }}</div>
      </div>
      <!-- Motor Data Row -->
      <div class="row">
        <div class="col-5">Motor: {{ dataMotor }}</div>
        <div class="col-7">
          <button @click="fetchTurn">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "displayOperador",
  data: function () {
    return {
      logged: false,
      user: '',
      password: '',
      dataTurn: '',
      dataCompany: '',
      dataModel: '',
      dataYear: '',
      dataMotor: ''
    }
  },
  methods: {
    login: function () {
      /* eslint-disable */
      // Apollo Handling
      console.log(this.user);
      console.log(this.password);
      // Apollo Handling
      // Dummy Variables
      let dummyUser = "root";
      let dummyPassword = "123"
      // Dummy Variables
      if (this.user === dummyUser && this.password === dummyPassword) {
        this.logged = true;
        this.getData();
      } else {
        alert("Usuario y/o Contraseña Incorrectos\nInténtelo de nuevo");
      }
      this.user = "";
      this.password = "";
    },
    getData: function () {
      // Apollo Handling
      this.dataTurn = "1";
      this.dataCompany = "Placeholder";
      this.dataModel = "Placeholder";
      this.dataYear = "Placeholder";
      this.dataMotor = "Placeholder";
      // Apollo Handling
    },
    pushTurn: function () {
      // Apollo Handling
      // GETs next turn data
      // Apollo Handling
    },
    fetchTurn: function () {
      this.pushTurn();
      this.getData();
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: #f18d2a;
  color: #ffffff;
  font-size: 4rem;
  height: 10rem;
  width: 40rem;
  &:active {
    background-color: #b3661a;
  }
}

.row { justify-content: flex-start; }

.welcome { text-transform: uppercase; }
</style>
