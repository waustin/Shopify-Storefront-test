import Vue from 'vue'
import App from './App.vue'

import './assets/sass/main.scss';
import router from './router'




import ApolloClient from 'apollo-boost';
const SHOPIFY_GQL_URI = 'https://' + process.env.VUE_APP_SHOPIFY_STORE_DOMAIN + '//api/2021-01/graphql.json';
const apolloClient = new ApolloClient({
    uri: SHOPIFY_GQL_URI,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.VUE_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
});

import VueApollo from 'vue-apollo'
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
