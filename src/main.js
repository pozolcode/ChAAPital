import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

Vue.config.productionTip = false

const httpLink = new HttpLink ({
  uri: 'https://chapital-counter.herokuapp.com/v1/graphql',
  headers: {
  }
})

const wsLink = new WebSocketLink ({
  uri: 'ws://chapital-counter.herokuapp.com/v1/graphql',
  options: {
    reconnect: true,
    connectionParams () {
      return {
        headers: {
        }
      }
    }
  }
})

const link = split(({ query }) => {
  const {kind, operation } = getMainDefinition (query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}, wsLink, httpLink)

const cache = new InMemoryCache ();

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  link,
  cache
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
