<template>
    <div class="product-component">
        <div class="loading" v-if="loading">Loading&hellip;</div>
        <div class="product" v-else>
            <header class="product-header columns mb-3">  
                
                <div v-if="selectedImage" class="column is-two-fifths selected-image-col">
                    <img class="selected-image" :src="selectedImage.src" :key="selectedImage.id"/>
                </div>  

                <div class="column info">
                    <h2 class="is-size-2">{{product.title}}</h2>
                    <p class="description mb-2" v-if="product.description">
                        {{product.description}}
                    </p>
                    <p>
                        <strong>Product Available For Sale: {{product.availableForSale}}</strong>
                    </p>

                    <div class="product-options columns">
                        <div v-for="opt in product.options" :key="opt.id">
                            <div class="field column">
                                <label class="label">{{opt.name}}</label>
                                <div class="select">
                                    <select change="onOptionChange(opt, $event)">
                                        <option v-for="(value, idx) in opt.values" :key="idx">
                                            {{value}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


            <div class="image-gallery">
                <img v-for="image in product.images" :key="image.id" :src="image.src"
                    @click="onGalleryImageClick(image)" />
            </div>

                <div class="variant-wrapper">
                    <div class="variant" v-for="v in product.variants" :key="v.id" >
                        title: {{v.title}}<br>
                        price: {{v.price}}<br>
                        available: {{v.available}}<br>
                        <img v-if="v.image" :src="v.image.src" />
                    </div>
        
                </div>

            <h4 class="is-size-4">Product Data</h4>
            <p>
                ID: {{id}}<br/>
                ENCODED PRODUCT ID: {{encodeShopifyProductId(id)}}
            
            </p>
            <pre>
                {{ product }}
            </pre>
            
        </div>
    </div>
</template>

<script>

import ShopifyClient from 'shopify-buy';

export default {
    name: 'Product',
    components: {
    
    },
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
            loading: false,
            product: null,
            selectedImage: null,
        }
    },
    created() {
        this.loading = true;
        this.shopifyClient = ShopifyClient.buildClient({
            domain: this.shopify_store_domain,
            storefrontAccessToken: this.shopify_storefront_access_token
        });

        this.getShopifyProductData(this.id);
    },
    methods: {
        async getShopifyProductData(id) {
            const productID = this.encodeShopifyProductId(this.id);
            try  {
                this.product = await this.shopifyClient.product.fetch(productID);
                this.loading = false;
                if(this.product.images.length > 0) {
                    this.selectedImage = this.product.images[0];
                }
            }
            catch(error) {
                console.log('Error Fetching Product Data');
                console.log(error);
            }
        },
        encodeShopifyVariantId(variantID) {
            const variantPrefix = 'gid://shopify/ProductVariant/';
            return btoa(`${variantPrefix}${variantID}`);
        },
        encodeShopifyProductId(productID) {
            const productPrefix = 'gid://shopify/Product/';
            return btoa(`${productPrefix}${productID}`);
        },
        onGalleryImageClick(image) {
            this.selectedImage = image;
        },
        onOptionChange(opt, event) {
            console.log('onOptionChange');
            console.log(opt);
            console.log(event);
        }
    },
    filters: {
        pretty: function(value) {
            return JSON.stringify(JSON.parse(value), null, 2);
        }
    }
}
</script>

<style scoped lang="scss">
    
</style>