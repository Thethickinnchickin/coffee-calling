<template>
<main>
        <div v-for="owner in followers.following" :key="owner._id" class="books-entity-teaser">
                    <div class="bucket mt-5 mb-5">
                        <nuxt-link style="color: black" :to="`/owner/${owner._id}`"><h2  class="mb-5 ml-5"><b class="a-text-bold">{{owner.name}}</b></h2></nuxt-link>
                        <div class="content">
                            <div class="row">
                                <!------ Author's photo and button --->
                                <div class="col-md-2 col-sm-4 col-4">
                                    <div class="authorContent">
                                        <div class="authorImageSingle">
                                            <nuxt-link :to="`/owner/${owner._id}`">
                                                <img :src="owner.photo" class="img-fluid" alt="Owner Image">
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                                <!------ Author's about --->        
                                <div class="col-md-10 col-sm-8 col-8 pl-0">
                                    <div class="mainContent">
                                        <h3>Biography:</h3>
                                        <div id="authorBio">{{owner.about}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <hr>
        </div>

</main>
</template>

<style>
    * {
        font-family: 'Courier New', monospace;
    }
    h2, h3 {
        font-family: 'Courier New', monospace;
    }
</style>

<script>
export default {
    async asyncData({$axios}) {
        let response =  await $axios.$get('/api/followers')

        return {
            followers: response.user
        }
    }
}
</script>