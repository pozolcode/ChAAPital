<template>
  <div class="page">
    <div class="container">
      <!-- Current Turn Row -->
        <div class="row">
          <li v-for="turn in turns" :key="turn.id">
          <div class="col-12"><span class="window-text">Turno</span></div>
          <div class="col-12"><span class="window-number">{{ turn.id }}</span></div>
          </li>
        </div>
      <!-- Open Operator Row -->
      <div class="row">
        <li v-for="operator in operatorList" :key="operator.id">
        <div class="col-12"><span class="window-text">Ventana</span></div>
        <div class="col-12"><span class="window-number">{{ operator.id }}</span></div>
        </li>
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
      turns: [],
      operatorList: []
    }
  },
  // Apollo Calls to fill variable names
  apollo: {
    $subscribe: {
      turns: {
        query: require ('../graphql/getTurnsSubscription.gql'),
        result ({ data }) {
          this.turns = data.turns
        }
      },
      operatorList: {
        query: require ('../graphql/getOperator.gql'),
        result ({ data }) {
          this.operatorList = data.operatorList
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {list-style: none}

.page {
  background-color: #f18d2a;
  color: #ffffff;
  height: 100vh;
}

.window-number { font-size: 5rem; }

.windows-text { text-transform: uppercase; }
</style>

