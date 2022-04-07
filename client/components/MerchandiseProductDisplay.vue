<template>


                <ul v-if="products.length > 0"  class="s-result-list">
                  <li class="s-result-item celwidget my-5" v-for="product in products" :key="product._id">
                    <div class="s-item-container mb-5">
                      <div>
                        <div class="row">
                          <!---image --->
                          <!---image --->
                          <div class="col-sm-3 text-center">
                            <nuxt-link :to="`/products/${product._id}`">
                              <img height="75"  :src="product.photo" alt="Product Image">
                            </nuxt-link>
                          </div>


                          <div class="col-sm-9">
                            <div class="a-row a-spacing-small">
                              <!--- Title and Date --->
                              <nuxt-link  @click='addToBrowsingHistory(product)' :to="`/products/${product._id}`" class="a-link-normal">
                                <button style="border: none; border-radius: 10px; background-color: white;" @click="addToBrowsingHistory(product)" class="a-size-medium">
                                  <h3 class="a-text-bold">{{product.title}}</h3>
                                  <span class="a-letter-space"></span>
                                  <span class="a-letter-space"></span>
                                </button>
                              </nuxt-link>
                            </div>
                            <!--Author's Name --->
                            <div class="a-row a-spacing-small">
                              <span class="a-size-small a-color-secondary">by</span>
                              <span class="a-size-small a-color-secondary">
                                <nuxt-link :to="`/owner/${product.owner._id}`">
                                  <a href="" class="a-link-normal a-text-normal">{{product.owner.name}}</a>
                                </nuxt-link>

                              </span>
                            </div>


                            <div class="row">
                              <div class="col-sm-7">
                                <!--- Price --->
                                <div class="a-row a-spacing-none">
                                  <a href="" class="a-link-normal a-text-normal">
                                    <span class="a-offscreen">${{product.price}}</span>
                                    <span class="a-color-base sx-zero-spacing">
                                      <span class="sx-price sx-price-large">
                                        <sup class="sx-price-currency">$</sup>
                                        <span class="sx-price-whole">{{product.price}}</span>
                                      </span>
                                    </span>
                                  </a>
                                  <span class="a-letter-space"></span>
                                </div>

  
                                <hr>
                             
              

                                <!---- Ratings ---->
                                <div class="col-sm-5">
                                  <div class="a-row a-spacing-mini">
                                    <!----Star Ratings ---->
                                    <!-- <no-ssr>
                                      <star-rating :rating="product.averageRating"
                                                   :show-rating="false"
                                                   :round-start-rating="false"
                                                   :glow="1"
                                                   :border-width="1"
                                                   :rounded-corners="true"
                                                   :read-only="true"
                                                   :star-size="18"
                                                   :star-points="[23,2,14,17,0,19,10,34,7,50,23,43,38,50,36,34,46,19,31,17]"
                                                   >

                                      </star-rating>
                                    </no-ssr> -->
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr>
                  </li>
                    
                  
                </ul>
</template>

<style scoped>
img {
  width: 75px
}
</style>

<script>
export default {
    props: ["products", "category"]
}
</script>