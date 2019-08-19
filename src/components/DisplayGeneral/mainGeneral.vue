<template>
  <div class="page">
    {{ getTurns() }}
    <div class="container">
      <div class="row">
        <div class="col-6 col-turn-display">
          <div class="container container-turns"><div v-for="turn in doneTurns" :key="turn.id">
              <div class="col-12">
                S{{ turn.id }}
              </div>
            </div>
            <div v-for="turn in attendingTurns" :key="turn.id">
              <div class="col-12 current-turn">
                <span class="checkout">
                  <span>Turno:</span>
                  <span>S{{ turn.id }}</span>
                </span>
                <span class="operator">
                  <span>Caja:</span>
                  <span>{{ turn.operatorId }}</span>
                </span>
              </div>
            </div>
            <div v-for="turn in turns" :key="turn.id">
              <div class="col-12">
                S{{ turn.id }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-logo">
          <img src="../../../public/assets/img/logo.jpg" alt="Big Logo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import { setTimeout } from 'timers';

  export default {
    name: 'mainGeneral',
    data: function () {
      return {
        turns: [],
        operatorList: [],
        attendingTurns: [],
        doneTurns: [],
        limit: 0
      }
    },
    apollo: {
      $subscribe: {
        turns: {
          query: require("../../graphql/getTurnsSubscription.gql"),
          result ({ data }) {
            this.turns = data.turns
          }
        },
        operatorList: {
          query: require ("../../graphql/getOperator.gql"),
          result ({ data }) {
            this.operatorList = data.operatorList
          }
        },
        attendingTurns: {
          query: require("../../graphql/subscriptionGetTurnsAttending.gql"),
          result ({ data }) {
            this.attendingTurns = data.turns
          }
        },
        doneTurns: {
          query: require ("../../graphql/subscriptionGetTurnsDone.gql"),
          variables () {
            return {
              limit: this.limit
            }
          },
          result ({ data }) {
            this.doneTurns = data.turns
          }
        }
      }
    },
    methods: {
      getTurns: function () {
        if (this.attendingTurns) {
          this.limit = 3 - this.attendingTurns.length
        }
        setTimeout (() => { this.getTurns() }, 45000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $background-grey: #F8F8F8;
  $contrast-red: #e30615;

  .page { background-color: $background-grey; }
  
  .container.container-turns {
    > div .col-12 {
      align-items: center;
      background-color: #ffffff;
      border-top: 0.5rem solid $background-grey;
      display: flex;
      font-size: 3.5rem;
      font-weight: 600;
      height: 10rem;
      justify-content: center;
      &.current-turn {
        background-color: $contrast-red;
        color: #ffffffff;
        font-weight: 800;
      }
    }
  }

  .current-turn.col-12 {
    .checkout {
      font-size: 2.5rem;
      margin-right: 5rem;
      text-transform: uppercase;
      span:nth-child(1) { margin-right: 2rem; }
      span:nth-child(2) { font-size: 4rem; }
    }
    .operator {
      font-size: 2.5rem;
      text-transform: uppercase;
      span:nth-child(1) { margin-right: 2rem; }
      span:nth-child(2) { font-size: 4rem; }
    }
  }
</style>
