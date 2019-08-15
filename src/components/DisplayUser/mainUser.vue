<template>
  <div class="page">
    <div class="container">
      <div class="row" v-if="start_view">
        <div class="col-12 col-start-view">
          <img class="img-start-view" src="../../../public/assets/img/logo-transparent.png" alt="Logo">
        </div>
        <button class="btn btn-start-view" @click="callUserForm()">Pide tu turno</button>
        <p class="p-start-view">
          ¿Eres cliente distinguido?<br>
          Pasa el Código de tu tarjeta por el lector para aprovechar sus beneficios
        </p>
      </div>
      <div class="row" v-else>
        <div class="col-12 col-user-form">
          <img class="img-user-form" src="../../../public/assets/img/logo-transparent.png" alt="Logo">
        </div>
        <div class="col-12">
          <span class="span-container-title">Armadora</span>
          <input type="text" class="input-user-company" v-model="company">
        </div>
        <div class="col-12">
          <span class="span-container-model">Modelo</span>
          <input type="text" class="input-user-model" v-mode="model">
        </div>
        <div class="col-12">
          <span class="span-container-year">Año</span>
          <input type="text" class="input-user-year" v-model="year">
        </div>
        <div class="col-12">
          <span class="span-container-engine">Motor</span>
          <input type="text" class="input-" v-model="engine">
        </div>
        <button class="btn btn-queries" @click="callQueries()">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainUser',
  data: function () {
    return {
      // Page Variables
      start_view: true,
      // Apollo Call Variables
      company: '',
      model: '',
      year: '',
      engine: ''
    }
  },
  methods: {
    callUserForm: function () {
      this.start_view = false;
    },
    callStartView: function () {
      this.start_view = true;
    },
    callQueries: function () {
      this.sendData();
      this.clear();
      this.callStartView();
    },
    sendData: function () {
      // Apollo Handling
      const {company, model, engine, year} = this
      this.$apollo.mutate ({
        mutation: require ('../../graphql/addTurns.gql'),
        variables: {
          company,
          model,
          engine,
          year
        }
      })
      // Apollo Handling
    },
    /*
    speedCheck: function () {
      Apollo Handling
      this.$apollo.mutate ({
        mutation: require ('../graphql/speedCheck.gql')
      })
      Apollo Handling
    }
    */
    clear: function () {
      this.company = "";
      this.model = "",
      this.year = "",
      this.engine = ""
    }
  }
}
</script>

<style lang="scss" scoped>
  /* Variables */
  $red-main: #ff0011;
  $red-alt: #c4000d;
  $red-strong: #e30615;

  /* General Page */

  .page {
    background-image: url("../../../public/assets/img/car-parts-and-car-edited.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 20rem;
    > .container {
      background-color: #ffffff;
      border-radius: 4.2rem;
    }
  }

  /* Start View */

  .col-start-view {
    text-align: right;
    .img-start-view {
      margin-right: 5rem;
      width: 25%;
    }
  }

  .btn.btn-start-view {
    background-color: $red-main;
    border-color: $red-main;
    border-radius: 5rem;
    font-size: 4rem;
    font-weight: 700;
    margin: 2.5rem 0;
    padding: 5rem 20rem;
    &:active {
      background-color: $red-alt;
      border-color: $red-alt;
    }
    &:hover {
      background-color: $red-alt;
      border-color: $red-alt;
    }
  }

  .p-start-view {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 2.5rem 1rem;
  }

  /* User Form */

  .col-12.col-user-form {
    margin: 0;
    text-align: left;
    .img-user-form {
      width: 30%;
      margin-left: 5rem;
    }
  }

  .col-12 {
    margin: 1.5rem 0;
    text-align: right;
    input[class^="input-"] {
      margin: 0 15% 0 5%;
      width: 40%;
    }
    [class^="span-container-"] {
      color: $red-strong;
      font-weight: 500;
      text-transform: uppercase;
    }
    &:nth-of-type(2) { margin-top: 0 }
    &:nth-of-type(5) { margin-bottom: 5rem; }
  }

  .btn.btn-queries {
    background-color: $red-main;
    border-color: $red-main;
    border-radius: 2rem;
    font-size: 4rem;
    font-weight: 700;
    padding: 3rem 10rem;
    position: absolute;
    right: 25%;
    top: 92%;
    &:active {
      background-color: $red-alt;
      border-color: $red-alt;
    }
    &:hover {
      background-color: $red-alt;
      border-color: $red-alt;
    }
  }
</style>
