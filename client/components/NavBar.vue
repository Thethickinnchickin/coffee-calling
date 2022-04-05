<template>
    <div class="main">
        <header style="background-color: #2e0000;" class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
            <div class="container-fluid desktop-nav" style="bottom: 0;">
                <div class="row">
                    <!--- Logo ---->
                    <div class="col-sm-2">
                        <div class="logo-area">
                            <nuxt-link style="text-decoration: none;" to="/">
                                <img d-inline style="height: 50px; width: 50px" src="/img/coffee.png" alt="Logo" class="img-fluid">   
                                <h5 style="font-family: 'Courier New', monospace; color: white;" class="col-1 d-inline"><b>Coffee Calling</b></h5>                                                           
                            </nuxt-link>
 
                        </div>
                         
                    </div>
                    
                    <!--- Search Bar ---->
                    <div class="col-sm-6 pt-0">
                        <Search />
                    </div>
                </div>
                <div  class="row">
                    <!--- Delivery --->
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 pl-2">
                        <div class="nav-global-location">
                            <nuxt-link v-if="$auth.$state.loggedIn" to="/address" class="nav-a nav-a-2">
                                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                                <div id="glow-ingress-block">
                                    <span style="font-family: 'Courier New', monospace;" class="nav-line-1"  id="glow-ingress-line1">Deliver To</span>
                                    <span style="font-family: 'Courier New', monospace;" v-if="$auth.$state.loggedIn && $auth.$state.user.address.length > 0"  class="nav-line-2" id="glow-ingress-line2">{{  $auth.$state.user.address[0].streetAddress }}</span> 
                                    <span style="font-family: 'Courier New', monospace;" v-else class="nav-line-2" id="glow-ingress-line2">Country</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <!---Shopping --->
                    <div class="col-xl-6 col-lg-5 col-md-4 col-sm-6 pl-0">
                        <div class="nav-fill">
                            <div class="nav-shop">
                                <nuxt-link to="/history" class="nav-a nav-a-2 nav-single-row-link">
                                    <span style="font-family: 'Courier New', monospace;" class="nav-line-2">
                                        Browsing history
                                        <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                                    </span>
                                </nuxt-link>
                            </div>

                            <div class="nav-xshop-container">
                                <div class="nav-xshop">
                                    <nuxt-link style="font-family: 'Courier New', monospace;" to="/coffee" class="nav-a"><b>All Coffee Brews</b></nuxt-link>
                                    <nuxt-link style="font-family: 'Courier New', monospace;" to=/coffeeProducts class="nav-a"><b>All Coffee Products</b></nuxt-link>
                                    <nuxt-link style="font-family: 'Courier New', monospace;" to=/merchandise class="nav-a"><b>All Merchandise</b></nuxt-link>
                                    <nuxt-link style="font-family: 'Courier New', monospace;" v-if="$auth.$state.loggedIn" to=/followers class="nav-a"><b>Followed Brands</b></nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--- Accounts, Order and Cart --->
                    <div  class="col-xl-4 col-lg-5 col-md-6 col-sm-4 pl-0">
                        <div class="nav-tools">
                            <span class="icp-nav-link-border"></span>

                            <template v-if="$auth.$state.loggedIn">
                                <nuxt-link to="/profile" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                    <span style="font-family: 'Courier New', monospace; color: white" class="nav-line-1">Hello, </span>
                                    <span style="font-family: 'Courier New', monospace;" class="nav-line-2">{{$auth.$state.user.name}}</span>
                                    <span style="font-family: 'Courier New', monospace;" class="nav-line-1">
                                        Account &amp; Lists
                                        <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                                    </span>
                                </nuxt-link>
                            </template>

                            <template v-else>
                                <nuxt-link to="/signup" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                    <span style="font-family: 'Courier New', monospace; color: white;" class="nav-line-1">Hello, Sign in</span>
                                    <span style="font-family: 'Courier New', monospace; color: white;" class="nav-line-1">
                                        Account &amp; Lists
                                        <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                                    </span>
                                </nuxt-link>
                            </template>


  
                            <nuxt-link v-if="$auth.$state.loggedIn" to="/orders" class="nav-a nav-a-2 nav-single-row-link">
                                <span class="nav-line-1"></span>
                                <span style="font-family: 'Courier New', monospace;" class="nav-line-2">Orders</span>
                            </nuxt-link>
                            <nuxt-link v-if="$auth.$state.loggedIn" to="/cart"  class="nav-a nav-a-2" id="nav-cart">
                                <span aria-hidden="true"  class="nav-line-1"></span>
                                <span style="font-family: 'Courier New', monospace;" aria-hidden="true" class="nav-line-2">Cart</span>
                                <span  class="nav-cart-icon nav-sprite"></span>
                                <span  class="nav-cart-count nav-cart-0" id="nav-cart-count">{{getCartLength}}</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style scoped>
    * {
        font-family: 'Courier New', monospace;
    }
</style>

<script>
import { mapGetters } from "vuex";
import Search from "~/components/Search";
export default {
    
    components: {
        Search
    },
    computed: {
        ...mapGetters(["getCartLength"]) 
    }
}
</script>