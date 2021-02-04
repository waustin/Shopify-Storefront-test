<template>
    <div class="product">
        <h1 class="title">This is a Product</h1>
        <p>ID: {{id}}</p>
        <p>
            SHOPIFY DOMAIN: {{shopify_store_domain}}<br/>
            SHOPIFY ACCESS TOKEN: {{shopify_storefront_access_token}}
        </p>
    </div>
</template>

<script>
import ShopifyClient from 'shopify-buy';

export default {
    name: 'Product',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data: function() {
        return {
            shopify_store_domain: process.env.VUE_APP_SHOPIFY_STORE_DOMAIN,
            shopify_storefront_access_token: process.env.VUE_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            shopifyClient: null,
        }
    },
    created() {
        this.shopifyClient = ShopifyClient.buildClient({
            domain: this.shopify_store_domain,
            storefrontAccessToken: this.shopify_storefront_access_token
        });
    }
}
</script>

<style scoped lang="scss">
    
</style>