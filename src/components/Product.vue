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
                    <p class="mb-3">
                        <strong>Product Available For Sale: {{product.availableForSale}}</strong>
                    </p>

                    <div class="product-options">
                        <variant-picker v-for="option in product.options"
                            :option="option"
                            @optionChanged="onOptionChange"
                            :key="option.id" />
                    </div>

                    <p>
                        Price: <strong>{{price}}</strong> 
                    </p>
                </div>
            </header>


            <div class="image-gallery">
                <img v-for="image in product.images" :key="image.id" :src="image.src"
                    @click="onGalleryImageClick(image)" />
            </div>

            <h3 class="is-size-3">Product Variants</h3>
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

import VariantPicker from './VariantPicker';
export default {
    name: 'Product',
    components: {
        VariantPicker,
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

            selectedOptions: [],
            selectedVariant: null,

            price: null
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
                this.selectedVariant = this.product.variants[0];
                console.log(this.product);
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
        onOptionChange(option, value) {
            console.log('onOptionChange', option, value);
            this.selectedOptions[option] = value;

            const selectedVariant = this.product.variants.find((variant) => {
                return variant.selectedOptions.every((selectedOption) => {
                        return this.selectedOptions[selectedOption.name] === selectedOption.value;
                });
            });
            
            this.selectedVariant = selectedVariant;
        }
    },
    watch: {
        selectedVariant(val) {
            if(val) {
                this.price = this.selectedVariant.price;
                if(val.image) {
                    this.selectedImage = val.image;
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
    
</style>