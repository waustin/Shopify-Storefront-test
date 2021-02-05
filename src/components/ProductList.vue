<template>
    <div class="product-list-component">
        <div class="loading" v-if="loading">Loading&hellip;</div>
        <div v-if="product_list" class="product-list">
            <div class="product-list-item"
                v-for="product in product_list" :key="product.id">
                <h4 class="is-size-4 mb-2">{{product.title}}</h4>
                <router-link class="button is-info"
                    :to="{ name: 'Product', params: { id: product.id}}">
                    View More
                </router-link>
            </div>    
        </div>

        <pre v-if="false">
            {{product_list}}
        </pre>
    </div>
</template>

<script>
import ShopifyClient from 'shopify-buy';

export default {
     data: function() {
        return {
            loading: true,
            shopifyClient: null,
            product_list: null,
            
        };
     },
    created() {
        const shopify_store_domain = process.env.VUE_APP_SHOPIFY_STORE_DOMAIN;
        const shopify_storefront_access_token = process.env.VUE_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
        this.shopifyClient = ShopifyClient.buildClient({
            domain: shopify_store_domain,
            storefrontAccessToken: shopify_storefront_access_token
        });
        this.loadAllProducts();
        
    },
    methods: {
        async loadAllProducts() {
             this.loading = true;
             try {
                 this.product_list = await this.shopifyClient.product.fetchAll();
                 this.loading = false;
             }
             catch(error) {
                console.log('Error Fetching Product Data');
                console.log(error);
            }
        }
    }
     
}
</script>

<style>

</style>