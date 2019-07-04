<template>
  <div class="page">
    <!-- Options Container -->
    <div class="container" v-if="!formView">
      <!-- Fast Service Row -->
      <div class="row">
        <div class="col-12">
          <button @click="sendFastData()">Caja Rapida</button>
        </div>
      </div>
      <!-- Refactions Row -->
      <div class="row">
        <div class="col-12">
          <button @click="formView = true;">Refacciones</button>
        </div>
      </div>
    </div>
    <!-- Form Container -->
    <div class="container" v-else>
      <!-- Company Row -->
      <div class="row">
        <div class="col-5 title-container">Armadora</div>
        <div class="col-7">
          <input type="text" v-model="company">
        </div>
      </div>
      <!-- Model Row -->
      <div class="row">
        <div class="col-5 title-container">Modelo</div>
        <div class="col-7">
          <input type="text" v-model="model">
        </div>
      </div>
      <!-- Year Row -->
      <div class="row">
        <div class="col-5 title-container">Año</div>
        <div class="col-7">
          <input type="text" v-model="year">
        </div>
      </div>
      <!-- Motor Row -->
      <div class="row">
        <div class="col-5 title-container">Motor</div>
        <div class="col-7">
          <input type="text" v-model="motor">
        </div>
        <div class="row disclaimer">
          <div>* opcional</div>
        </div>
      </div>
      <!-- Send Button Row -->
      <div class="row">
        <div class="col-12">
          <button class="send-form" @click="sendData()">General Folio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'displayUsuario',
  data: function () {
    return {
      formView: false,
      company: '',
      model: '',
      year: '',
      motor: ''
    }
  },
  methods: {
    sendData: function () {
      // Apollo Handling
      this.$apollo.mutate ({
        mutation: gql`mutation ($company: String, $model: String, $year: String, $motor: String, $speedCheck: Boolean, $status: String) {
           insert_turns(objects:{
             company: $company,
             model: $model,
             motor: $motor,
             speedCheck: false,
             status: "free",
             year: $year
           }
        }`
      })
      // Apollo Handling
      this.clear();
      this.formView = false;
    },
    clear: function () {
      this.company = "";
      this.model = "";
      this.year = "";
      this.motor = "";
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: #f18d2a;
  color: #ffffff;
  font-size: 4rem;
  height: 164px;
  width: 636px;
  &:active {
    background-color: #b3661a;
  }
}

.title-container {
  background-color: #f3af31;
  color: #ffffff;
  text-transform: uppercase;
}

.disclaimer {
  font-size: 3rem;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  & > div {
    margin-left: 12%;
  }
}
</style>
