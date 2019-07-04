<template>
  <div class="page">
    <div class="container">
      <!-- Current Turn Row -->
        <div class="row">
          <div class="col-12"><span class="window-text">Turno</span></div>
          <div class="col-12"><span class="window-number">{{ currentTurn }}</span></div>
        </div>
      <!-- Open Operator Row -->
      <div class="row">
        <div class="col-12"><span class="window-text">Ventana</span></div>
        <div class="col-12"><span class="window-number">{{ openOperator }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'displayGeneral',
  data: function () {
    return {
      currentTurn: 0,
      openOperator: 0
    }
  },
  // Apollo Calls to fill variable names
  apollo: {
    currentTurn: {
      query: gql`
      query getTurns {
        turns (limit: 1, where: {status: {_eq: "free"}, speedCheck: {_eq: false}}) {
          id
        }
      }`,
      update (data) {
        return data.turns.currentTurn;
      }
    },
    openOperator: {
      query: gql`
      query getOperator {
        operatorList (limit: 1, where: {active: {_eq: true}, type: {_eq: 1}}) {
          id
        }
      }`,
      update (data) {
        return data.operatorList.openOperator;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f18d2a;
  color: #ffffff;
  height: 100vh;
}

.window-number { font-size: 5rem; }

.windows-text { text-transform: uppercase; }
</style>

