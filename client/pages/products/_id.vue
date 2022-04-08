<template>
    <main class="mt-5">
        <!---- Breadcreumbs --->
        <div class="a-spacing-top"></div>
        <div class="container-fluid">
            <div class="way-finding-breadcrumbs-container">
                <ul class="a-unordered-list a-horizontal a-size-small">
                    <li>
                        <span class="a-list-item">
                            <nuxt-link :to="`/${product.category.type}`" class="a-link-normal a-color-tertiary">{{product.category.type}}</nuxt-link>
                        </span>
                    </li>
                    <li>
                        <span class="a-list-item">></span>
                    </li>
                    <li>
                        <span class="a-list-item">
                            <nux-link class="a-link-normal a-text-bold a-color-tertiary">{{product.title}}</nux-link>
                        </span>
                    </li>
                </ul>
            </div>
        </div>    
        <div class="container-fluid">
            <div class="dp-container">
                <div class="row">
                    <!--- First 3 grid - Product Image and Author's Section --->                    
                    <div class="col-lg-3 col-md-3 col-sm-4">
                        <div class="leftCol">
                            <!--- image --->
                            <div class="imgBlock">
                                <div class="eBooksimg">
                                    <img height="150" width="150" :src="product.photo" alt="Product Image" class="img-fluid">
                                </div>
                            </div>
                            <!---- Follow Author --->
                            <div class="authorFollow">
                                <hr class="a-divider-normal"/>
                                <h1 style="font-family: 'Courier New', monospace;" class="authorFollowHeading a-text-bold">Follow The Author</h1>
                                <div class="a-spacing-top-small">
                                    <div class="row">
                                        <!---- Author's image --->
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <div class="smallAuthorImageContainer">
                                                <nuxt-link :to="`/owner/${product.owner._id}`">
                                                    <img style="width: 50%; height: 3px;"  alt="Product Image" :src="product.owner.photo" class="img-fluid">
                                                </nuxt-link>
                                            </div>
                                        </div>
                                        <!---- Author's Name --->
                                        <div class="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <div class="authorNameCol">
                                                <nuxt-link :to="`/owner/${product.owner._id}`">{{product.owner.name}}</nuxt-link>
                                            </div>
                                        </div>
                                        <!---- Author's follow button --->
                                        <div v-if="$auth.$state.loggedIn" class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div v-if="!isFollowing" class="authorBtn mt-2">
                                            
                                                    <span class="btnFollow">
                                                        <span class="a-btn-inner">
                                                            <button @click="onFollow(product.owner._id, product._id)" class="a-btn-text">+ Follow</button>
                                                        </span>
                                                    </span>
    
                                            </div>
                                            <div v-else class="authorBtn mt-2">
                                                    <span class="btnFollow">
                                                        <span class="a-btn-inner">
                                                            <button @click="onUnfollow(product.owner._id, product._id)" class="a-btn-text">- Unfollow</button>
                                                        </span>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--- Middle 6 grid Description --->
                    <div class="col-lg-6 col-md-6 col-sm-8">
                        <div class="centerCol">
                            <!---- Product Title --->
                            <div class="titleDiv">
                                <h1 class="productTitle">
                                    <span class="a-text-bold largeTitle">{{product.title}}</span>
                                </h1>
                            </div>
                            <!---- Author's Name --->
                            <div class="bylineinfo">
                                by
                                <nuxt-link :to="`/owner/${product.owner._id}`">
                                <span class="authorName">{{product.owner.name}}
                                    <i class="fas fa-chevron-down" style="font-size: 8px !important; color: #555 !important;"></i>
                                </span> 
                                </nuxt-link>
                            </div>

                            <div class="reviewGroup">
                                <!----Star Ratings ---->
                                <no-ssr>
                                    <star-rating :rating="product.averageRating"
                                                :round-start-rating="false"
                                                :show-rating="false"
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
                            <hr style="margin-top: 10px;" />


                            <!--- Description ---> 
                            <div class="bookDescription">
                                <div class="bookdescriptionInner">{{product.description}}</div>
                            </div>


                        </div>
                    </div>
                    <!--- Last 3 grid buying selection --->    
                    <div class="col-lg-3 col-md-3 col-sm-6">
                        <div class="combinedBuyBox">
                            <div v-if="$auth.$state.loggedIn" class="buyBox">
                                <div  class="a-section">
                                    <div  class="clearfix">

                                        <!--- Product Price --->
                                        <div class="float-right">
                                            <span class="a-size-medium a-color-price offer-price a-text-normal">
                                                ${{product.price}}
                                            </span>
                                        </div>
                                    </div>
                                </div>    

                                <div class="a-section a-spacing-small a-spacing-top-micro">
                                    <div class="row">
                                        <span class="a-color-base buyboxShippingLabel"></span>
                                    </div>
                                </div>

                                <div class="a-section a-spacing-small">
                                    <div class="a-section a-spacing-none">
                                        <span class="a-size-medium a-color-success">In Stock</span>
                                    </div>
                                </div>

                                <div class="a-section">
                                    <div class="a-button-stack">
                                        <span  class="a-spacing-small a-button-primary a-button-icon">
                                            <span @click="addProductToCart(product)" class="a-button-inner">
                                                <i
                                                
                                                
                                                
                                                 >
                                                    <input  type="submit" name="submit.add-to-cart" class="a-button-input">
                                                    <span style="background-color: #2e0000; color: #d0e6ff" class="a-button-text" @click="addProductToCart(product)">Add to Cart</span>
                                                </i>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div class="a-row">
                                    <div class="a-spacing top-small">
                                        <div class="a-section a-spacing-none">
                                            <div class="a-section a-spacing-none a-spacing-top-mini">
                                                This item ships to
                                                <b>United States</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <span class="a-declarative">
                                    <span class="a-link-normal">
                                        <div class="a-row a-spacing-mini">
                                            <i class="fal fa-map-market-alt"></i>
                                            <span class="a-size-small" v-if="$auth.$state.loggedIn && $auth.$state.user.address.length > 0">Deliver to {{$auth.$state.user.address[0].country}}</span>
                                            <span class="a-size-small" v-else>Deliver to Country</span>
                                        </div>
                                    </span>
                                </span>
                                <br>
                                <hr>

                            </div>    
                            <div v-else class="buyBox">
                                <div>
                                    <div  class="clearfix">
                                    <nux-link>
                                    </nux-link>
                                    <h2><nuxt-link to="/login">Login</nuxt-link> or <nuxt-link to="/signup">Register</nuxt-link> to Order!</h2>
                                        <!--- Product Price --->
                                        <div class="float-center">  
                                            
                                        </div>
                                    </div>
                                </div>    

                                <div class="a-section a-spacing-small a-spacing-top-micro">
                                    <div class="row">
                                        <span class="a-color-base buyboxShippingLabel"></span>
                                    </div>
                                </div>

                            </div>  
                        </div>                        
                    </div>                            

                </div>
                <br>
                <hr>
                <div class="books-entity-teaser">
                    <div class="bucket">
                        <h2>More about the brand owner</h2>
                        <div class="content">
                            <div class="row">
                                <!------ Author's photo and button --->
                                <div class="col-md-2 col-sm-4 col-4">
                                    <div class="authorContent">
                                        <div class="authorImageSingle">
                                            <span>
                                                <img height="2"  alt="Product Image" :src="product.owner.photo" class="img-fluid">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!------ Author's about --->        
                                <div class="col-md-10 col-sm-8 col-8 pl-0">
                                    <div class="mainContent">
                                        <h3 class="a-text-bold" style="font-family: 'Courier New', monospace;">Biography</h3>
                                        <div id="authorBio">{{product.owner.about}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Link to another Review page -->
                <div v-if="$auth.$state.loggedIn">
                    <span v-if="reviews.length === 0" class="a-button-base writeReviewButton cm-cr-button-wide">
                            <span class="a-button-inner">
                                <nuxt-link :to="`/reviews/${product._id}`" class="a-button-text">Write a customer review</nuxt-link>
                            </span>
                        </span>
                    <CustomerReviews v-else :product="product" :reviews="reviews" :reviewPercents="product.percentPerStar" />                    
                </div>

            </div>
        </div>
    </main>    

</template>

<style scoped>
  img {
    height: 500px;
    max-width: 150px;
    max-height: 150px;
  }
button #product {
    background-color: #2e0000;
    color: #d0e6ff;
    font-family: 'Courier New', monospace;
}


</style>

<script>
import CustomerReviews from "~/components/CustomersReviews"
import StarRating from "vue-star-rating";
import { mapActions } from "vuex";
export default {

    components: {
        CustomerReviews,
        StarRating
    },

    async asyncData({$axios, params}) {
        try {
            let singleProduct = $axios.get(`/api/product/${params.id}`);
            let manyReviews = $axios.get(`/api/reviews/${params.id}`);
            


            let [productResponse, reviewResponse] = await Promise.all([
                singleProduct,
                manyReviews,
            ]);
            let following = false;
            if(productResponse.data.isFollowing != null) {
                following = productResponse.data.isFollowing
            }
            return{
                product: productResponse.data.product,
                reviews: reviewResponse.data.reviews,
                isFollowing: following
            };
        } catch (err) {
            return
        }
    },
    methods : {
        ...mapActions(["addProductToCart", "addToBrowsingHistory"]),
        async onFollow(ownerId, productId) {
            let response = await this.$axios.$put(`/api/followers/${ownerId}`)

            this.isFollowing = true;

            await this.$router.push(`/products/${productId}`)
        },
        async onUnfollow(ownerId, productId) {
            let response = await this.$axios.$post(`/api/followers/remove/${ownerId}`)

            this.isFollowing = false;

            await this.$router.push(`/products/${productId}`)
        }
    }
}
</script>