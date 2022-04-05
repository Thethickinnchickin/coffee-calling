<template>
        <div class="row my-5">
            <!-- - Main Content -  -->
            <div class="col-xl-10 col-lg-9 md-8 col-sm-8">
              <nuxt-link style="text-decoration: none" to="/coffee"> 
              <h1>{{category}}</h1>
              </nuxt-link>
              <div class="mainResults">
                <div class="row">
                  <div v-for="product in products" :key="product._id" class="col-sm-5 col-md-6 col-lg-4 my-2">
                    <div class="border-0 card">
                      <div class="card-body d-flex flex-column">
                        <span>
                          <nuxt-img sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw" alt="Product Photo" :src="`${product.photo}`"/>                          
                        </span>


                        <h2 style="height: 30px; font-size: 20px" class="card-title my-2">{{product.title}}</h2>
                          <!-- -- Ratings -- -->
                            <div class="col-sm-5 my-3">
                              <div class="a-row a-spacing-mini">
                                <!----Star Ratings ---->
                                <!-- <no-client>
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
                                </no-client>  -->
                              </div>
                            </div>
                        <p class="card-text">{{product.description}}</p>
                        <p class="card-text"><b>{{product.owner.name}}</b></p>
                        <nuxt-link @click='addToBrowsingHistory(product)' :to="`/products/${product._id}`" class="mt-auto">
                          <button @click='addToBrowsingHistory(product)' class="btn mt-auto">Order</button>
                        </nuxt-link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nuxt-link to="/coffee" class="col-lg-1 pull-right">            
            <button  id="seeMoreCoffee" >
                See More Coffee
            </button>
            </nuxt-link>

         </div>
</template>

<style scoped>
  h1 {
    font-family: 'Courier New', monospace;
    color: black;
  }
  h1:hover {
    color: #d0e6ff;
    text-decoration: none;
  }
  button {
    background-color: #2e0000;
    color: #d0e6ff;
    font-family: 'Courier New', monospace;
  }
  button:hover {
    background-color: #d0e6ff;
    color:#2e0000;
  }
  #seeMoreCoffee, #seeMoreCoffeeProducts, #seeMoreMerchandise {
    border-radius: 9999em 9999em 9999em 9999em;
    margin-top: 50px;
    width: 100px;
    height: 500px;
  }
  img {
    height: 500px;
    max-width: 150px;
    max-height: 150px;
  }
  @media (max-width: 990px) {
    #seeMore {
      width: 100%;
      height: 100px;
      margin: auto
    }  
  } 
  @media (max-width: 780px) {
    .card-title {
      margin-bottom: 10px;
    }
  }
</style>


<script>
// import StarRating from "vue-star-rating";
import {mapActions} from "vuex";

export default {
    components: {
      // StarRating
    },
    props: ["category", "products"],
    
    methods: {
    ...mapActions(["addToBrowsingHistory"])
    }
}
</script>