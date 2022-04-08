<template>
  <!--MAIN-->
  <main>
    <!--SHOPPING CART-->
    <div class="shopping-cart mt-3">

      <div class="container-fluid c-section">

        <div v-if="getCartLength > 0" class="row">
          <div class="col-lg-9 col-md-8 col-sm-7">
            <div class="c-section a-spacing-top-base">
              <div class="a-row sc-cart-header sc-compact-bottom">
                <h2>Shopping Cart</h2>
              </div>
              <form action="#" method="post">
                <div class="sc-list-head">
                  <div class="text-right a-spacing-top-micro">
                    <span class="a-color-secondary">Price</span>
                  </div>
                </div>
                <!-- List of the item -->
                <div v-for="product in getCartProducts" :key="product._id" class="sc-list-body">
                  <div class="sc-list-item-border">
                    <div class="a-row a-spacing-top-base a-spacing-base">
                      <div class="row">
                        <!-- Product's Image -->
                        <div class="col-sm-2 col-2">
                          <a href="#" class="a-link-normal">
                            <img :src="product.photo" class="img-fluid w-100" />
                          </a>
                        </div>
                        <div class="col-sm-8 col-8">
                          <!-- Product's Title -->
                          <div class="a-spacing-mini">
                            <a
                              href="#"
                              class="a-link-normal a-size-medium a-text-bold"
                            >{{product.title}}</a>
                            <!-- Product's Owner name -->
                            <span class="a-size-base sc-product-creator">by {{product.owner.name}}</span>
                          </div>
                
                          <div>
                            <span
                              class="a-size-small a-color-success mb-5 sc-product-availability"
                            >In Stock</span>
                          </div>
                          <div class="mt-3 sc-action-links">
                            <select @change="onChangeQty($event, product)">
                              <option  v-for="i in 10" :key="i" :value="i" :selected="checkQty(product.quantity, i)">Qty: &nbsp;{{i}}</option>
                            </select>
                            &nbsp;&nbsp;
                            <span>|</span>
                            &nbsp;
                            <!-- Delete button -->
                            <span class="a-size-small">
                              <a @click="$store.commit('removeProduct', product);" href="">Delete</a>
                            </span>
                            &nbsp;
                            &nbsp;
                          </div>
                        </div>
                        <div class="col-sm-2 col-2 tr sm-txt-r">
                          <!-- Product's Price -->
                          <p class="a-spacing-small">
                            <span
                              class="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold"
                            >${{getCartTotalPrice}}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- List of the item -->

                <div class="text-right">
                  <!-- Cart Subtotal -->
                  <p class="a-spacing-none a-spacing-top-mini">
                    <span class="a-size-medium">Subtotal ({{getCartLength}} item)</span>
                    <span class="a-color-price a-text-bold">
                      <!-- Cart Total Price -->
                      <span class="a-size-medium a-color-price">${{getCartTotalPrice}}</span>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-5">
            <div class="a-box-group" style="margin-bottom: 14px;">
              <div class="a-box a-color-alternate-background">
                <div class="a-box-inner">
                  <div class="a-spacing-mini">
                    <p class="a-spacing-none a-spacing-top-none">
                      <!-- Cart Subtotal -->
                      <span class="a-size-medium">
                        <span>Subtotal ({{getCartLength}} item):</span>
                        <span class="a-color-price a-text-bold">
                          <!-- Cart Total Price  -->
                          <span class="a-size-medium a-color-price">${{getCartTotalPrice}}</span>
                        </span>
                      </span>
                    </p>
                  </div>
                  <div class="mt-3">
                    <nuxt-link to="/placeorder">
                      <span  v-if="getCartLength > 0" class="a-spacing-small mt-3">
                        <span style="background-color: #2e0000;" class="a-button-inner">
                          <span to="/placeorder" style="color: white;" class="a-button-text">Proceed to checkout</span>
                        </span>
                      </span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recently Viewed -->
            <div class="a-spacing-large">
              <div class="a-box">
                <div v-if="getBrowsingHistory.length > 0" class="a-box-inner">
                  <h5 class="a-spacing-base">Your recently viewed items</h5>
                  <div  class="a-spacing-micro">
                    <ul class="a-unordered-list recently-viewed">
                      <li class="a-spacing-medium" v-for="product in getBrowsingHistory" :key="product._id">
                        <span class="a-list-item">
                          <div class="row">
                            <div class="col-md-4 col-sm-3 col-3 pl-0">
                              <a href="#">
                                <img style="height: 100px; width: 100px" :src="product.photo" class />
                              </a>
                            </div>
                            <div class="col-md-8 col-sm-9 col-9">
                              <a href="#" class="a-link-normal">{{product.title}}</a>
                              <div class="a-size-small">
                                <a href="#" class="a-size-small a-link-child">{{product.owner.name}}</a>
                              </div>
                              <div class="a-icon-row a-spacing-none">
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
                              <div class="a-spacing-top-micro">
                                <span
                                  class="a-button-inspired a-spacing-top-none a-button-base a-button-small"
                                >
                                  <span class="a-button-inner">
                                    <nuxt-link :to="`/products/${product._id}`"><a href="#" class="a-button-text">See all buying options</a></nuxt-link>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>  
          <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5">
              <h1 class="display-4 fw-normal">Cart Empty</h1>
              <p class="lead fw-normal">Check out our products on our home page!</p>
              <nuxt-link style="background-color: #2e0000; color: #d0e6ff" class="btn btn-outline-secondary" to="/">Get Me Coffee</nuxt-link>
            </div>
            <div class="product-device shadow-sm d-none d-md-block"></div>
            <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
          </div>
        </div>
      </div>
    </div>
    <!--/SHOPPING CART-->
  </main>
  <!--/MAIN-->
</template>


<script>
import {mapGetters} from "vuex";


export default {
    computed: {
      ...mapGetters(["getCartProducts", "getCartTotalPrice", "getCartLength", "getBrowsingHistory", "getHistoryLength"])
    },
    methods: {
      onChangeQty(event,product) {
        let qty = parseInt(event.target.value);
        this.$store.commit("changeQty", {product, qty});
      }, checkQty(prodQty, qty) {
        if (parseInt(prodQty) === parseInt(qty)) {
          return true;
        } else {
          return false;
        }
      }
    }
}
</script>