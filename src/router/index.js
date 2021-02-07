import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import ProductPage from '../views/ProductPage';
import ShopifyApollo from '../views/ShopifyApollo';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
    props: true,
  },
  {
    path: '/shopify-apollo',
    component: ShopifyApollo,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
