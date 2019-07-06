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
      <ApolloQuery :query="require('../graphql/getTurns.gql')">
        <template slot-scope="{result: { data }}">
          <div v-if="data">
            <!-- Welcome Row -->
            <div v-for="turn in data.turns" :key="turn.id">
              <div class="row">
                <div class="col-5 welcome">Bienvenido Operador</div>
              </div>  
              <!-- Current Turn Row -->
              <div class="row">
                <div class="col-5">Atendiendo Turno: {{ turn.id }}</div>
              </div>
              <!-- Company Data Row -->
              <div class="row">
                <div class="col-5">Armadora: {{ turn.company }}</div>
              </div>
              <!-- Model Data Row -->
              <div class="row">
                <div class="col-5">Modelo: {{ turn.model }}</div>
              </div>
              <!-- Year Data Row -->
              <div class="row">
                <div class="col-5">Año: {{ turn.year }}</div>
              </div>
              <!-- Motor Data Row -->
              <div class="row">
                <div class="col-5">Motor: {{ turn.motor }}</div>
              <div class="col-7">
            </div>
            <button @click="fetchTurn">Siguiente</button>
            </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
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
      operatorList: [],
      turns: []
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
          id
        }
      }`
    }
  },
  methods: {
    login: function () {
      this.operatorList.forEach(element => {
          /* eslint-disable */
        if (this.user === element.name && this.password === element.password) {
          let id = element.id;
          this.$apollo.mutate ({
            mutation: require ('../graphql/operatorStatus.gql'),
            variables: {
              id
            }
          })
          this.logged = true;
        }
      });
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