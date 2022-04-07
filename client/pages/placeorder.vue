<template>
<body>
  <!--SHIPPING ADDRESS-->
  <div class="container-fluid">
    <div class="shipping-address">
      <div class="navbarShipping a-spacing-large">
      </div>
      <div class="a-row">
        <div class="a-size-large a-text-bold a-spacing-mini">Review your order</div>
        <div class="a-row a-spacing-small a-size-mini"></div>
      </div>
      <div class="row">
        <div class="col-xl-9 col-lg-8 col-md-9 col-sm-12">
          <div class="a-row a-spacing-large"></div>
          <div class="spc-top a-box a-spacing-small">
            <div class="a-box-inner">
              <div class="row">
                <div class="col-xl-4 col-lg-6 col-sm-6 col-6">
                  <div class="a-spacing-base">
                    <div class="a-row">
                      <strong>
                        Shipping address
                        <small>
                          <a href="#">Change</a>
                        </small>
                      </strong>
                    </div>
                    <div class="a-row">
                      <div v-if="$auth.$state.loggedIn" class="displayAddressDiv">
                        <!-- User's address -->
                        <ul class="displayAddressUL">
                          <li>{{$auth.$state.user.address.fullName}}</li>
                          <li>{{$auth.$state.user.address.streetAddress}}</li>
                          <li>{{$auth.$state.user.address.city}}</li>
                          <li>{{$auth.$state.user.address.country}}</li>
                          <li>
                            Phone:
                            <span dir="ltr">{{$auth.$state.user.address.phoneNumber}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-sm-6 col-6">
                  <div class="a-spacing-base">
                    <div class="a-row">
                      <strong>
                      </strong>
                    </div>
                    <div class="a-row">
                    </div>
                  </div>
                  <div class="a-row a-spacing-base">
                    <div class="a-row">
                      <strong>
                        Billing Address
                        <small>
                          <a href="#">Change</a>
                        </small>
                      </strong>
                    </div>
                    <span>Same as shipping address</span>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-sm-12 col-12">
                  <div class="a-spacing-base">
                    <div class="a-spacing-mini">
                      <span>
                        <strong></strong>
                      </span>
                    </div>
                    <div class="row">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="spc-orders a-box">
            <div class="a-box-inner">
              <div class="shipping-group">
                <!-- Estimated delivery -->
                <div
                  class="a-row a-color-state a-text-bold a-size-medium a-spacing-small"
                >Estimated delivery: {{estimatedDelivery}}</div>
                <div class="row">
                  <!-- Cart -->
                  <div class="col-xl-6 col-lg-7 col-sm-6 col-12">
                    <div class="a-row a-spacing-base">
                      <div v-for="product in getCartProducts" :key="product._idF" class="row">
                        <!-- Product's photo -->
                        <div class="col-sm-3 col-3">
                          <img :src="product.photo" style="width: 100px;" />
                        </div>
                        <!-- Product's Title -->
                        <div class="col-sm-9 col-9">
                          <div class="a-row">
                            <strong>{{product.title}}</strong>
                          </div>
                          <!-- Product's owner name -->
                          <div class="a-row a-size-small">by {{product.owner.name}}</div>
                          <div class="a-row">
                            <!-- Product's price -->
                            <span class="a-color-price a-spacing-micro">
                              <strong dir="ltr">${{product.price}}</strong>
                            </span>
                          </div>
                          <div class="a-row">
                            <span class="availability a-color-success">In Stock.</span>
                          </div>
                          <div class="a-row">
                            <!-- Product's quantity -->
                            <strong>Quantity: {{product.quantity}}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-5 col-sm-6 col-12">
                    <div class="a-row shipping-speeds">
                      <fieldset>
                        <span class="shipping-speeds-title a-size-medium">
                          <b>Choose a delivery option:</b>
                        </span>
                        <!-- Delivery option -->
                        <div class="a-spacing-mini wednesday">
                          <!-- Shipping normal -->
                          <input type="radio" name="order0" checked="checked" @change="onChooseShipping('normal')"/>
                          <span class="a-radio-label">
                            <span class="a-color-success">
                              <strong>Averages 7 business days</strong>
                            </span>
                            <br />
                            <span
                              class="a-color-secondary"
                            >$13.98&nbsp;-&nbsp;Standard International Shipping - No Tracking</span>
                          </span>
                        </div>
                        <br />
                        <div class="a-spacing-mini tuesday">
                          <!-- Shipping fast -->
                          <input type="radio" name="order0" @change="onChooseShipping('fast')" />
                          <span class="a-radio-label">
                            <span class="a-color-success">
                              <strong>Averages 3 business days</strong>
                            </span>
                            <br />
                            <span class="a-color-secondary">$49.98&nbsp;-&nbsp;Shipping</span>
                          </span>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-3 col-sm-12 pl-0">
          <div class="a-box-group">
            <div class="a-box a-first">
              <div class="a-box-inner">
                <div style="background-color: #2e0000;" class="a-row a-spacing-micro">
                  <span style="background-color: #2e0000;" class="a-button-inner">
                    <nuxt-link to="/payment" style="color: white;" class="a-button-text mb-3">Proceed to checkout</nuxt-link>
                  </span>
                </div>

                <div class="a-row">

                  <h3 class="a-spacing-micro a-size-base">Order Summary</h3>
                  <div class="order-summary" style="font-size: 12px;">
                    <div class="row">
                      <!-- Cart's total price -->
                      <div class="col-sm-6">Items:</div>
                      <div class="col-sm-6 text-right">USD ${{getCartTotalPrice}}</div>
                    </div>
                    <div class="row">
                      <!-- Shipping cost -->
                      <div class="col-sm-6">Shipping & handling:</div>
                      <div class="col-sm-6 text-right">USD {{shippingPrice}}</div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-sm-6"></div>
                      <div class="col-sm-6 text-right">
                        <hr />
                      </div>
                    </div>
                    <!-- Total Price with Shipping -->
                    <div class="row">
                      <div class="col-sm-6">Total Before Tax:</div>
                      <div class="col-sm-6 text-right">USD {{getCartTotalPriceWithShipping}}</div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">Estimated tax to be collected:</div>
                      <div class="col-sm-6 text-right">USD {{getTaxOfOrder}}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="a-color-price a-size-medium a-text-bold">Order total:</div>
                      </div>
                      <div class="col-sm-6 text-right">
                        <!-- Total Price with Shipping -->
                        <div class="a-color-price a-size-medium a-text-bold">USD ${{getCartTotalPriceWithShipping}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <p class="a-size-small a-text-center a-color-secondary" data-testid>
        <a href="#">Conditions of Use</a> |
        <a href="#">Privacy Notice</a> © 2022, Coffee Calling Inc.
      </p>
    </div>
  </div>
  <!--/SHIPPING ADDRESS-->
</body>
</template>

<script>
import {mapGetters} from "vuex";








export default {
  computed: {
      ...mapGetters(["getCartProducts", "getCartTotalPrice", "getCartLength", "getCartTotalPriceWithShipping", "getTaxOfOrder"])
  },
  async asyncData({ $axios, store }) {
    try {
      let response = await $axios.$post('/api/shipment', {shipment: "normal"});

      
      store.commit("setShipping", {
        price: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      });

      return {
        shippingPrice: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      }
    } catch(err) {
      return
    }


  },
  methods: {
    async onChooseShipping(shipment) {
      try{
        let response = await this.$axios.$post('/api/shipment', {shipment: shipment});

        this.$store.commit("setShipping", {
          price: response.shipment.price,
          estimatedDelivery: response.shipment.estimated
        });
        
        this.shippingPrice = response.shipment.price,
        this.estimatedDelivery = response.shipment.estimated
      } catch (err) {
        return 
      }
    },
    clearCart() {
      this.$store.commit("clearCart");
      this.$router.push("/");
    }
  }
};
</script>
