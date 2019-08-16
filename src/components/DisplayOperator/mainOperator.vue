<template>
  <div class="page">
    <div class="container">
      <div class="row" v-if="!logged">
        <div class="col-12 col-not-logged">
          <img src="../../../public/assets/img/logo-transparent.png" alt="Logo" class="img-not-logged">
        </div>
        <div class="col-12 page-label">Usuario</div>
        <div class="col-12 page-input">
          <input type="text" placeholder="Ingrese su usuario..." v-model="user">
        </div>
        <div class="col-12 page-label">Contraseña</div>
        <div class="col-12 page-input">
          <input type="password" placeholder="Ingrese su contraseña..." v-model="password">
        </div>
        <div class="col-12 page-btn">
          <button class="btn btn-loggin" @click="login">Entrar</button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12 operator-intro">Hola, caja {{ operatorId }}</div>
        <div class="col-12 operator-current-turn">
          <span>Atendiendo turno:</span>
          <span>S{{ currentId }}</span>
        </div>
        <div class="col-6 container-company">
          <div class="element-container">
            <div class="col-12">Armadora</div>
            <div class="col-12">{{ company || "N/A" }}</div>
          </div>
        </div>
        <div class="col-6 container-model">
          <div class="element-container">
            <div class="col-12">Modelo</div>
            <div class="col-12">{{ model || "N/A" }}</div>
          </div>
        </div>
        <div class="col-6 container-year">
          <div class="element-container">
            <div class="col-12">Año</div>
            <div class="col-12">{{ year || "N/A" }}</div>
          </div>
        </div>
        <div class="col-6 container-engine">
          <div class="element-container">
            <div class="col-12">Motor</div>
            <div class="col-12">{{ enigne || "N/A" }}</div>
          </div>
        </div>
        {{ busy() }} {{ attending() }}
        <button class="btn btn-next-turn">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import getTurnQuery from '../../graphql/getTurns.gql';

  export default {
    name: 'mainOperator',
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
        engine: ''
      }
    },
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
      },
      turns: {
        query: gql`
          query turns {
            turns (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}, order_by: {id: asc}) {
              company
              model
              engine
              year
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
            this.free();
            this.logged = true;
          }
        });
      },
      pushTurn: function () {
        //Apollo Handling
        /* eslint-disable */
        this.free();
        const{ currentId } = this
        this.$apollo.mutate ({
          mutation: require ('../../graphql/clientDone.gql'),
          variables: {
            currentId
          },
          refetchQueries: [{
            query: getTurnQuery
          }]
        })
        //Apollo Handling
      },
      attending: function () {
        /* eslint-disable */
        const { currentId, operatorId } = this
        this.$apollo.mutate ({
          mutation: require ('../../graphql/clientAttending.gql'),
          variables: {
            currentId,
            operatorId
          }
        })
      },
      free: function () {
        /* eslint-disable */
        const { operatorId } = this;
        this.$apollo.mutate ({
          mutation: require ('../../graphql/operatorStatus.gql'),
          variables: {
            operatorId
          }
        })
      },
      busy: function () {
        /* eslint-disable */
        const { operatorId } = this;
        this.$apollo.mutate ({
          mutation: require ('../../graphql/operatorOcupate.gql'),
          variables: {
            operatorId
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $contrast-red: #ff0011;
  $contrast-grey: #b1b1b1;
  $dark-red: #e30615;
  $light-grey: #f8f8f8;

  .page {
    background-image: url("../../../public/assets/img/logo-edited.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 20rem;
    > .container {
      background-color: #ffffff;
      border-radius: 4.2rem;
      padding: 2.5rem 5rem;
      .page-input input {
        border: 0;
        border-bottom: 0.1rem solid $contrast-grey;
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 3rem;
        padding: 1rem;
      }
      .page-label {
        color: $dark-red;
        font-weight: 700;
        margin-bottom: 2rem;
        text-align: left;
        text-transform: uppercase;
      }
    }
  }
  
  .page-input {
    text-align: left;
      input {
        &:focus { outline: none }
        &::placeholder { color: $contrast-grey; }
    }
  }

  button.btn.btn-loggin {
    background-color: $contrast-red;
    color: #ffffff;
    border-color: $contrast-red;
    border-radius: 4rem;
    font-size: 3.5rem;
    font-weight: 600;
    margin: 2.5rem 0;
    padding: 2.5rem 14rem;
    text-transform: uppercase;
    &:active {
      background-color: $dark-red;
      border-color: $dark-red;
    }
  }

  .col-not-logged {
    text-align: right;
    .img-not-logged {
      margin-right: 5rem;
      width: 35%;
    }
  }

  .row > .container {
    margin: 0;
    padding: 0;
    > .row {
      margin: 0;
      padding: 0;
    }
  }

  .operator-intro {
    font-size: 5rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .operator-current-turn {
    margin-bottom: 4rem;
    span:nth-child(1) {
      font-size: 3rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    span:nth-child(2) {
      color: $dark-red;
      margin-left: 1.2rem;
      font-weight: 800;
    }
  }

  .element-container {
    background-color: $light-grey;
    border-radius: 1.5rem;
    font-size: 3rem;
    margin: 2rem;
    text-transform: uppercase;
    .col-12:nth-child(1) { font-weight: 600; }
    .col-12:nth-child(2) { color: $dark-red; }
  }

  .btn.btn-next-turn {
    background-color: $contrast-red;
    border-color: $contrast-red;
    font-size: 3rem;
    padding: 2.5rem 8rem;
    position: absolute;
    right: 15%;
    top: 93%;
    &:active {
      background-color: $dark-red;
      border-color: $dark-red;
    }
  }
</style>
