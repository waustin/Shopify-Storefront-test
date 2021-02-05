<template>
    <div class="home-page container">
        <h1 class="title">Pick a Product From the nav or list</h1>
        <section class="section">
            <product-list/>
        </section>
    </div>
</template>

<script>
import ProductList from '../components/ProductList';

export default {
    name: 'Home',
    components: {
        ProductList
    }
}
</script>

<style>

</style>