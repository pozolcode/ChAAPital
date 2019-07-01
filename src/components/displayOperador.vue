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
      password: ''
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
      } else {
        alert("Usuario y/o Contraseña Incorrectos\nInténtelo de nuevo");
      }
      this.user = "";
      this.password = "";
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
