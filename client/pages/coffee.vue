<template>
    <main>

        <div class="ListingPage">
        <div class="container-fluid">
        <h1 style="font-family: 'Courier New', monospace;" class="coffee-title mr-10 mt-3">Coffee</h1>
          <div class="row">
            <!-- - Main Content -  -->
            <div class="col-12">
              <TopProduct :topProduct="products[0]"/>

              <div class="mainResults">
              <ProductPageDisplay :products="products"  category="coffee"/>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </main>
</template>

<script>
import ProductPageDisplay from "~/components/ProductPageDisplay";
import TopProduct from "~/components/FeaturedProduct";
import StarRating from "vue-star-rating";
import { mapActions } from "vuex";

export default {
  components: {
    ProductPageDisplay,
    TopProduct,
    StarRating
  },

  async asyncData({$axios}) {
    try {
      let response = await $axios.$get('/api/coffee');
      return {
        products: response.products
      }
    } catch (err) {
      return
    }
  },
  methods: {
    ...mapActions(["addToBrowsingHistory"])
  }
}
</script>

<style>
    .coffee-title {
        font-size: 50px;
        margin-left: 100px;
        margin-right: auto;
    }

</style>


