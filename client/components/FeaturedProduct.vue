<template>
        <div class="mainContent mt-5">
            <div class="unified_widget pageBanner">
                <p>
                    <b  style="font-family: 'Courier New', monospace; color: black;" >
                        Browse for more!
                        <nuxt-link  to="/coffee">Coffee</nuxt-link>, or
                        <nuxt-link to="/coffeeProducts">Coffee Products</nuxt-link> like grinders and pour overs or check out some 
                        <nuxt-link to="/merchandise">Merchandise</nuxt-link>
                    </b>
                </p>
            </div>
            <div class="bx-root">
                <div class="row">
                    <div class="col-sm-5 text-center">
                        <div class="bx-root-image">
                            <img height="100" style="width: 75%" alt="Top Product" :src="topProduct.photo" class="img-fluid">
                        </div>
                    </div>
                    <div  style="font-family: 'Courier New', monospace;"  class="col-sm-7 m-auto">
                        <div class="bx-root-dtls">
                            <div class="bx-root-heading"><b>{{topProduct.title}}</b></div>
                        </div>
                        <div class="bx-root-subtext">
                            <div class="btx-root-heading">{{topProduct.description}}</div>
                        </div>
                        <div class="bx-root-link">
                            <nuxt-link :to="`/products/${topProduct._id}`"><span>Order Now</span></nuxt-link>
                        </div>
                    </div>


                </div>
            </div>
        </div>

</template>

<style scoped>
  img {
    max-width: 150px;
    max-height: 150px;
  }
</style>

<script>
export default {
    props: ["topProduct"]
}
</script>