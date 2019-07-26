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
          <div>
            <!-- Welcome Row -->
            <div v-for="turn in turns" :key="turn.id">
              {{ motor = turn.motor }}
              {{ company = turn.company }}
              {{ year = turn.year }}
              {{ model = turn.model }}
              {{ currentId = turn.id }}
            </div>
              <div class="row">
                <div class="col-5 welcome">Bienvenido Operador {{ user }}</div>
              </div>  
              <!-- Current Turn Row -->
              <div class="row">
                <div class="col-5">Atendiendo Turno: {{ currentId }}</div>
              </div>
              <!-- Company Data Row -->
              <div class="row">
                <div class="col-5">Armadora: {{ company }}</div>
              </div>
              <!-- Model Data Row -->
              <div class="row">
                <div class="col-5">Modelo: {{ model }}</div>
              </div>
              <!-- Year Data Row -->
              <div class="row">
                <div class="col-5">Año: {{ year }}</div>
              </div>
              <!-- Motor Data Row -->
              <div class="row">
                <div class="col-5">Motor: {{ motor }}</div>
                {{ ocupado() }}
              <div class="col-7">
            <button @click="fetchTurn">Siguiente</button>
            </div>
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
      operatorList: [],
      turns: [],
      currentId: null,
      operatorId: null,
      model: '',
      company: '',
      year: '',
      motor: ''
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
          this.operatorId = element.id;
          this.libre();
          this.logged = true;
        }
      });
    },
    pushTurn: function () {
      //Apollo Handling
      /* eslint-disable */
      this.libre();
      const{ currentId } = this
      this.$apollo.mutate ({
        mutation: require ('../graphql/clientDone.gql'),
        variables: {
          currentId
        }
      })
      //Apollo Handling
    },
    fetchTurn: function () {
      /* eslint-disable */
      this.$apollo.query ({
          query: {
            
          },
        result ({ query }) {
          this.turns = data.turns
        }
      })
      return alert(this.turns)
      // if ( this.turns === !null ) {
      //   this.attending();
      // }
    },
    attending: function () {
      /* eslint-disable */
      const { currentId, operatorId } = this
      this.$apollo.mutate ({
        mutation: require ('../graphql/clientAttending.gql'),
        variables: {
          currentId,
          operatorId
        }
      })
    },
    libre: function () {
      /* eslint-disable */
      const { operatorId } = this;
      this.$apollo.mutate ({
        mutation: require ('../graphql/operatorStatus.gql'),
        variables: {
          operatorId
        }
      })
    },
    ocupado: function () {
      /* eslint-disable */
      const { operatorId } = this;
      this.$apollo.mutate ({
        mutation: require ('../graphql/operatorOcupate.gql'),
        variables: {
          operatorId
        }
      })
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