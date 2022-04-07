<template>
    <main>
        <div class="mainResults mt-5">
                <ul v-if="getBrowsingHistory.length > 0" class="s-result-list">
                  <li class="s-result-item celwidget" v-for="product in getBrowsingHistory" :key="product._id">
                    <div class="s-item-container mt-5">
                      <div>
                        <div class="row">
                          <!---image --->
                          <div class="col-sm-3 text-center">
                            <a href="">
                              <img class="img-fluid"  :src="product.photo" alt="">
                            </a>
                          </div>

                          <div class="col-sm-9">
                            <div class="a-row a-spacing-small">
                              <!--- Title and Date --->
                              <nuxt-link  :to="`/products/${product._id}`" href="" class="a-link-normal">
                                <h2 class="a-size-medium">
                                  {{product.title}}
                                  <span class="a-letter-space"></span>
                                  <span class="a-letter-space"></span>
                                </h2>
                              </nuxt-link>
                            </div>
                            <!--Author's Name --->
                            <div class="a-row a-spacing-small">
                              <span class="a-size-small a-color-secondary">by</span>
                              <span class="a-size-small a-color-secondary">
                                <a href="" class="a-link-normal a-text-normal">{{product.owner.name}}</a>
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
                             

                                <!-- -- Ratings -- -->
                                <div class="col-sm-5">
                                  <div class="a-row a-spacing-mini">
                                    <!----Star Ratings ---->
                                    <no-ssr>
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
                                    </no-ssr> 
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <div v-else class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                  <div class="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 class="display-4 fw-normal">No History</h1>
                    <p class="lead fw-normal">Check out our products on our home page!</p>
                    <nuxt-link style="background-color: #2e0000; color: #d0e6ff" class="btn btn-outline-secondary" to="/">Coffee</nuxt-link>
                  </div>
                  <div class="product-device shadow-sm d-none d-md-block"></div>
                  <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>


              </div>
    </main>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters(["getBrowsingHistory", "getHistoryLength"])
    }
}
</script>