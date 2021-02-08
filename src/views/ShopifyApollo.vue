<template>
  <div>
      <h1 class="title">Shopify Apollo Page</h1>
      <p>
          Shop Loading: [{{$apollo.queries.shop.loading}}]
    </p>
      <div v-if="$apollo.queries.shop.loading">Loading ...</div>
      <div v-if="!$apollo.queries.shop.loading">
            <h4 class="is-size-4 mb-2">{{shop.name}}</h4>
        
            <div v-for="product in shop.products.edges" :key="product.id">
                <h5 class="is-size-5">{{product.node.title}}</h5>
            </div>
      </div>
      <pre>
          Shop Name: {{shop.name}}<br>
          Shop Description: {{shop.description}}
          Shop Primary Domain: {{shop.primaryDomain}}
          Product: {{shop.products}}
      </pre>
  </div>
</template>

<script>

import gql from 'graphql-tag'

export default {
    name: 'SpofiyApollo',
    apollo: {
        shop: gql`{
            shop { 
                name
                description
                primaryDomain {
                    host
                    url
                }
                products(first: 10) {
                    edges {
                        node {
                            id
                            title
                            handle
                            availableForSale
                            priceRange {
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                            options {
                                name
                                values
                            }
                            images(first: 10) {
                                edges {
                                    node {
                                        id
                                        altText
                                        originalSrc
                                        transformedSrc
                                        height
                                        width
                                    }
                                }
                            }
                            variants(first: 20) {
                                edges {
                                    node {
                                        id
                                        title
                                        availableForSale
                                        currentlyNotInStock
                                        priceV2 {
                                            amount
                                            currencyCode
                                        }
                                        image {
                                            id
                                            originalSrc
                                            height
                                            width
                                        }
                                        selectedOptions {
                                           name
                                           value 
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            } 
        }`,
    },
    data() {
        return {
            shop: '',
        };
    },
    created() {
        console.log('Shopify Apollo Created');
        console.log(this.$apollo.provider.clients);

    }
}
</script>

<style>

</style>