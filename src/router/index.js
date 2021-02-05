import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductPage from '../views/ProductPage';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductPage
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
