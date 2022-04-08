<template>
    <main>

        <div class="ListingPage">
        <div class="container-fluid">
        <h1 style="font-family: 'Courier New', monospace;"  class="coffee-title mt-3">Merchandise</h1>
          <div class="row">
            <!-- - Main Content -  -->
            <div class="col-12">
              <TopProduct :topProduct="products[0]"/>


              <div class="mainResults">
                <ProductPageDisplay :products="products" category="merch"/>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </main>
</template>

<script>
import MerchandiseProductDisplay from "~/components/MerchandiseProductDisplay"
import TopProduct from "~/components/FeaturedProduct";
import StarRating from "vue-star-rating";
import { mapActions } from "vuex";

export default {
  components: {
    MerchandiseProductDisplay,
    TopProduct,
    StarRating
  },

  async asyncData({$axios}) {
    try {
      let response = await $axios.$get('/api/merchandise');
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
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>