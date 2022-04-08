<template>
  <!--MAIN-->
  <main>
    <!--YOUR ORDER-->
    <div v-if="$auth.$state.loggedIn && orders.length > 0" class="container-fluid your-order">
      <div v-if="!viewMoreOrders" class="row">
          <div class="col-xl-2 col-lg-1 col-md-12"></div>
          <div class="col-xl-8 col-lg-9 col-md-12">
            <div class="a-spacing-large a-spacing-top-small a-subheader a-breadcrumb">
              <ul class="a-unordered-list a-nostyle a-horizontal">
                <li>
                  <span class="a-list-item">
                      <nuxt-link style="color:#000080" to="profile">
                        <span>Your Account</span>
                      </nuxt-link>
                  </span>
                </li>
                <li class="a-breadcrumb-divider">›</li>
                <li>
                  <span class="a-list-item">
                    <span class="a-color-state" style="font-family: 'Courier New', monospace;">Your Orders</span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-5 col-12">
                <h1 class="a-spacing-medium" style="font-family: 'Courier New', monospace;">Your Orders</h1>
              </div>
            </div>
            <div class="a-row a-spacing-medium custom-view-options">
            </div>
            <div v-if="orders.length">
              <div  >
                  <div class="orderContentHeader">
                    <div  class="row">
                      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 text-left">
                        <div class="a-row">
                          <span class="a-size-mini a-color-secondary" style="font-family: 'Courier New', monospace;">ORDER PLACED</span>
                          <br />
                          <span class="a-size-base a-text-bold a-color-secondary">{{orders[0].dateOrdered}}</span>
                        </div>
                      </div>
                      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                        <div class="a-row">
                          <span class="a-size-mini a-color-secondary">TOTAL</span>
                          <br />
                          <span class="a-size-base a-text-bold a-color-secondary">${{orders[0].orderTotalWithShipping}}</span>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-3">
                        <div class="a-row">
                          <span class="a-size-mini a-color-secondary">SHIP TO</span>
                          <br />
                          <!-- Owner's name -->
                          <nuxt-link style="color:#000080" to="/address" class="a-size-base font-weight-bold a-link-normal">
                            {{$auth.$state.user.address[0].streetAddress}}
                            <i class="far fa-chevron-down"></i>
                          </nuxt-link>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-5 text-right">
                        <div class="a-row">
                          <span class="a-size-mini a-color-secondary">ORDER # {{orders[0]._id}}</span>
                          <br />
                        </div>
                      </div>
                    </div>
              
                  <!-- Orders body -->
                  <div class="orderContentBodyAlt">
                    <div class="a-row">
                      
                      <h1
                        class="a-size-medium a-text-bold"
                        style="color: #111 !important;font-family: 'MyWebFont',Arial,sans-serif !important; "
                      >
                        <!-- Estimated Delivery -->
                      Estimated Delivery - {{orders[0].estimatedDelivery}}
                      </h1>
                    </div>
                    <!-- List of products from order -->
                    <div v-for="product in orders[0].products" :key="product._id">
                      <div class="a-spacing-base"></div>
                      <div class="row">
                        <div class="col-xl-2 col-lg-2 col-2">
                          <!-- Product's image -->
                            <img alt="Product Image" :src="product.productID.photo" class="img-fluid" style="width: 100px;" />
                        </div>
                        <div class="col-xl-10 col-lg-10 col-10">
                          <div class="a-row">
                            <span class="a-size-small">
                              <!-- Product title -->
                              <nuxt-link style="color:#000080" :to="`/products/${product.productID._id}`">{{product.productID.title}}</nuxt-link>
                            </span>
                          </div>
                          <div class="a-row">
                            <span class="a-size-mini a-color-secondary">Sold by: {{product.productID.owner.name}}</span>
                          </div>
                          <div class="a-row">
                            <!-- Product quantity -->
                            <span class="a-size-mini" style="color: #111; font-weight: 400;">Quantity: {{product.quantity}}</span>
                          </div>
                          <div class="a-row">
                            <!-- Product price -->
                            <span class="a-size-mini a-color-price">${{product.productID.price}}</span>
                          </div>
                          <br />
                          <div class="a-row">
                            <nuxt-link style="color:#000080" :to="`/products/${product.productID._id}`">
                              <span  class="a-button-view-item">View your item</span>
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div style="width 100%" class="row">
            <div v-if="!viewMoreOrders && orders.length > 1" class="row mt-3" style="margin: auto;">
              <button style="margin: auto" class="a-button-primary" @click="onMoreOrdersClicked">More Orders</button>
            </div>
          </div>
          <div class="col-xl-2 col-lg-1 col-md-12"></div>
        </div>
      </div>

      <div v-if="viewMoreOrders" class="row">
          <div class="col-xl-2 col-lg-1 col-md-12"></div>
          <div class="col-xl-8 col-lg-9 col-md-12">
            <div class="a-spacing-large a-spacing-top-small a-subheader a-breadcrumb">
              <ul class="a-unordered-list a-nostyle a-horizontal">
                <li>
                  <span class="a-list-item">
                      <nuxt-link style="color:#000080" to="profile">
                        <span>Your Account</span>
                      </nuxt-link>
                  </span>
                </li>
                <li class="a-breadcrumb-divider">›</li>
                <li>
                  <span class="a-list-item">
                    <span class="a-color-state" style="font-family: 'Courier New', monospace;">Your Orders</span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-5 col-12">
                <h1 class="a-spacing-medium" style="font-family: 'Courier New', monospace;">Your Orders</h1>
              </div>
            </div>
            <div class="a-row a-spacing-medium custom-view-options">
            </div>
            <div v-for="order in orders" :key="order._id" >
                <div class="orderContentHeader">
                  <div  class="row">
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 text-left">
                      <div class="a-row">
                        <span class="a-size-mini a-color-secondary" style="font-family: 'Courier New', monospace;">ORDER PLACED</span>
                        <br />
                        <span class="a-size-base a-text-bold a-color-secondary">{{order.dateOrdered}}</span>
                      </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                      <div class="a-row">
                        <span class="a-size-mini a-color-secondary">TOTAL</span>
                        <br />
                        <span class="a-size-base a-text-bold a-color-secondary">${{order.orderTotalWithShipping}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-3">
                      <div class="a-row">
                        <span class="a-size-mini a-color-secondary">SHIP TO</span>
                        <br />
                        <!-- Owner's name -->
                        <nuxt-link style="color:#000080" to="/address" class="a-size-base font-weight-bold a-link-normal">
                          {{$auth.$state.user.address[0].streetAddress}}
                          <i class="far fa-chevron-down"></i>
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-5 text-right">
                      <div class="a-row">
                        <span class="a-size-mini a-color-secondary">ORDER # {{order._id}}</span>
                        <br />
                      </div>
                    </div>
                  </div>
            
                <!-- Orders body -->
                <div class="orderContentBodyAlt">
                  <div class="a-row">
                    
                    <h1
                      class="a-size-medium a-text-bold"
                      style="color: #111 !important;font-family: 'MyWebFont',Arial,sans-serif !important; "
                    >
                      <!-- Estimated Delivery -->
                    Estimated Delivery - {{order.estimatedDelivery}}
                    </h1>
                  </div>
                  <!-- List of products from order -->
                  <div v-for="product in order.products" :key="product._id">
                    <div class="a-spacing-base"></div>
                    <div class="row">
                      <div class="col-xl-2 col-lg-2 col-2">
                        <!-- Product's image -->
                          <img alt="Product Image" :src="product.productID.photo" class="img-fluid" style="width: 100px;" />
                      </div>
                      <div class="col-xl-10 col-lg-10 col-10">
                        <div class="a-row">
                          <span class="a-size-small">
                            <!-- Product title -->
                            <nuxt-link style="color:#000080" :to="`/products/${product.productID._id}`">{{product.productID.title}}</nuxt-link>
                          </span>
                        </div>
                        <div class="a-row">
                          <span class="a-size-mini a-color-secondary">Sold by: {{product.productID.owner.name}}</span>
                        </div>
                        <div class="a-row">
                          <!-- Product quantity -->
                          <span class="a-size-mini" style="color: #111; font-weight: 400;">Quantity: {{product.quantity}}</span>
                        </div>
                        <div class="a-row">
                          <!-- Product price -->
                          <span class="a-size-mini a-color-price">${{product.productID.price}}</span>
                        </div>
                        <br />
                        <div class="a-row">
                          <nuxt-link style="color:#000080" :to="`/products/${product.productID._id}`">
                            <span  class="a-button-view-item">View your item</span>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          <div class="row">
              <div v-if="viewMoreOrders && orders.length > 1" class="row mt-3" style="margin: auto;">
                <button class="a-button-primary" style="margin: auto" @click="onMoreOrdersClicked">See Less Orders</button>
              </div>
          </div>
          <div class="col-xl-2 col-lg-1 col-md-12"></div>
        </div>
      </div>

    
    </div>    
    <div v-else>  
      <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">No Orders</h1>
          <p class="lead fw-normal">Check out our products on our home page!</p>
          <nuxt-link style="background-color: #2e0000; color: #d0e6ff" class="btn btn-outline-secondary" to="/">Get Me Coffee</nuxt-link>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
    </div>
    <!--/YOUR ORDER-->
  </main>
  <!--/MAIN-->
</template>

<style scoped>
  * {
    font-family: 'Courier New', monospace;
  }
</style>

<script>
export default {
    data() {
      return {
        viewMoreOrders: false
      }
    },
    async asyncData({$axios}) {
        let response = await $axios.$get('/api/orders');

      
        return {
          orders: response.orders
        }
    },
    methods: {
      onMoreOrdersClicked() {
        if(!this.viewMoreOrders) {
          this.viewMoreOrders = true;
        } else {
          this.viewMoreOrders = false;
        }
      }
    }
}
</script>