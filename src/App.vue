<template>
    <div id="app">
        <nav id="nav" class="navbar is-black">
            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item">Home</router-link>
                    <router-link 
                        v-for="product in products" :key="product.id"
                        :to="{ name: 'Product', params: { id: product.id}}" class="navbar-item">
                        {{product.name}}
                    </router-link>
                </div>
            </div>
        </nav>
        <section class="section">
            <router-view />
        </section>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                products: [{
                    id: '5889796341918',
                    name: 'Product 1',
                }, {
                    id: '5901384286366',
                    name: 'Product 2',
                }, {
                    id: '5896895463582',
                    name: 'Product 3'
                },],
            };
        }
    }
</script>

<style lang="scss">
    #app {}
</style>