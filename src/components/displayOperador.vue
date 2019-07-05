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
import gql from 'graphql-tag'

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
      dataMotor: '',
      operatorList: [],
    }
  },
  // Apollo Calls to get operator data
  apollo: {
    operatorList: {
      query: gql`
      query {
        operatorList {
          name
          password
        }
      }`
    }
  },
  methods: {
    login: function () {
      /* eslint-disable */
      this.operatorList.forEach(element => {
        if (this.user === element.name && this.password === element.password) {
          this.getData();
          this.logged = true;
        }
      });
    },
    getData: function () {
      // Apollo Handling
      apollo: ({
        dataCompany: {
          query: gql`
          query getTurns {
            dataCompany (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}) {
              company
            }
          }`
        },
        dataMotor: {
          query: gql`
          query getTurns {
            dataMotor (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}) {
              motor
            }
          }`
        },
        dataModel: {
          query: gql`
          query getTurns {
            dataModel (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}) {
              model
            }
          }`
        },
        dataYear: {
          query: gql`
          query getTurns {
            dataYear (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}) {
              year
            }
          }`
        },
        dataTurn: {
          query: gql`
          query getTurns {
            dataTurn (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}) {
              id
            }
          }`
        }
      })
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