<template>
  <div id="app">
      <section class="section">
        <Product id="product-id" />
      </section>
  </div>
</template>

<script>
import Product from './components/Product.vue'

export default {
    name: 'App',
    components: {
        Product
    }
}
</script>

<style lang="scss">
    #app {

    }
</style>
