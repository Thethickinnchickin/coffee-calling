<template>
                    <div class="books-entity-teaser">
                    <div class="bucket mt-5 mb-5">
                        <h2 class="mb-5 ml-5"><b class="a-text-bold">{{owner.name}}</b></h2>
                        <div class="content">
                            <div class="row">
                                <!------ Author's photo and button --->
                                <div class="col-md-2 col-sm-4 col-4">
                                    <div class="authorContent">
                                        <div class="authorImageSingle">
                                            <a href="">
                                                <img :src="owner.photo" class="img-fluid">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!------ Author's about --->        
                                <div class="col-md-10 col-sm-8 col-8 pl-0">
                                    <div class="mainContent">
                                        <h3>Biography</h3>
                                        <div id="authorBio">{{owner.about}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template>

<style>
    * {
        font-family: 'Courier New', monospace;
    }
    h2 {
        font-family: 'Courier New', monospace;
    }
</style>
      

<script>
export default {
    async asyncData({$axios, params}) {
        let response = await $axios.$get(`/api/owners/${params.id}`);

        return {
            owner: response.owner
        }
    }
}
</script>