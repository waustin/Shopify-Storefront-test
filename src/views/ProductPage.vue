<template>
    <div class="product-page">
        <section class="section">
            <Product :id="id" :key="id"/>
        </section>
    </div>
</template>

<script>
import Product from '../components/Product.vue'
export default {
    name: 'ProductPage',
    components: {
        Product
    },
    props: {
        id: {
            type: String,
            required: false,
            default: "5889796341918"
        },
    },
}
</script>

<style>

</style>