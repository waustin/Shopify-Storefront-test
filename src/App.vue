<template>
    <div id="app">
        <nav id="nav" class="navbar is-black">
            <div class="navbar-menu"><div class="navbar-start">
                <router-link to="/" 
                    class="navbar-item">
                    Product 1
                </router-link>
                
                <router-link :to="{ name: 'Product', params: { id: '5901384286366'}}" 
                    class="navbar-item">
                    Product 2
                </router-link>
            </div></div>
        </nav>
        <section class="section">
            <router-view/>
        </section>
  </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="scss">
    #app {

    }
</style>
