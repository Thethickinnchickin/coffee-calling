<template>
    <main>

        <div class="ListingPage">
        <div class="container-fluid">
          <FeaturedProduct :topProduct="topProduct.product"/>
          <HomeProductsDisplay :products="coffee" category="Coffee" link="coffee"/>
          <hr>

          <HomeProductsDisplay :products="coffeeProducts" category="Coffee Products" link="coffeeProducts"/>
          <hr>

          <HomeProductsDisplay :products="merchandise" category="Merchandise" link="merchandise"/>
          <hr>
        </div>        
      </div>
    </main>
</template>


<script>
import FeaturedProduct from "~/components/FeaturedProduct";
import HomeProductsDisplay from "~/components/HomeProductsDisplay";
import { mapActions } from "vuex";
export default {
  components: {
    FeaturedProduct,
    HomeProductsDisplay
  },
  async asyncData({$axios}) {
    try {
      let coffee = await $axios.$get('/api/home/coffee');
      let merchandise = await $axios.$get('/api/merchandise');
      let coffeeProducts = await $axios.$get('/api/coffee/products')
      let topProduct = await $axios.$get('/api/top/product')
      
      return {
        coffee: coffee.products,
        merchandise: merchandise.products,
        coffeeProducts: coffeeProducts.products,
        topProduct: topProduct
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions(["addToBrowsingHistory"])
  }
}
</script>