import Vue from 'vue'
import App from './App.vue'
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.config.productionTip = false

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  uri: 'https://chapital-counter.herokuapp.com/v1/graphql',
  headers: {
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "Loading"
  }
})

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
