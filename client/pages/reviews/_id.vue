<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium">
              <h1 class="a-spacing-base">
                <b>Create Review</b>
              </h1>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-2 col-sm-3 col-3">
                  <img :src="product.photo" style="width: 80px" />
                </div>
                <!-- Product Title -->
                <div class="col-md-10 col-sm-9 col-9 m-auto">
                  <h4>
                    <b>{{ product.title }}</b>
                  </h4>
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <h2 class="a-spacing-base">Overall Rating</h2>
              <div class="a-row">
                <!-- Rating -->
                <client-only>
                    <star-rating v-model="rating"></star-rating>                    
                </client-only>
              </div>
              <div class="a-row a-spacing-top-large">
                <h2>Add photo or video</h2>
                <p
                  style="font-size: 14px; font-weight: 700;"
                >Shoppers find images and videos more helpful than text alone.</p>
              </div>
              <div class="a-row a-spacing-top-medium">
                <!-- Choose a Photo -->
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>
                  <input type="file" @change="onFileSelected" />
                </label>
                <p>{{fileName}}</p>
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a headline</h2>
                <input
                  v-model="headline"
                  type="text"
                  class="a-input-text"
                  style="width: 70%;"
                  placeholder="What's most important to know?"
                />
              </div>
              <!-- Body -->
              <div class="a-spacing-base">
                <h2 class="a-spacing-base">Write your review</h2>
                <textarea
                  v-model="body"
                  placeholder="What do you like or dislike? What did you see this product for?"
                  style="height:6em; width: 100%;"
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div class="a-spacing-top-medium">
              <p
                style="font-size: 14px; font-weight: 700;"
              >This is how you'll appear to other customers:</p>
              <div class="media a-spacing-top-large">
                <div class="media-left">
                  <img src="/img/avatar.png" class="img-fluid" style="width: 50px;" />
                </div>
                <div class="media-body pl-3 pt-2">
                  <input type="text" class="a-input-text" style="width: 100%;"/>
                </div>
              </div>
            </div>
            <div class="a-row a-spacing-top-medium">
              <span class="a-color-tertiary">Don't worry, you can always change this on your profile</span>
            </div>
            <div class="a-row text-right a-spacing-top-large">
              <span class="mt-auto">
                  <span style="width: 100%" id="button" class="btn mt-auto" @click="onAddReview">Submit</span>
              </span>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<style scoped>
    #button {
    background-color: #2e0000;
    color: #d0e6ff;
    font-family: 'Courier New', monospace;
    }
    #button:hover {
    background-color: #d0e6ff;
        color:#2e0000;
    }
</style>

<script>
import StarRating from "vue-star-rating";

export default {
    components: {
      StarRating
    },
    async asyncData({ $axios, params}) {
        try{
            let response = await $axios.$get(`/api/product/${params.id}`);

            return {
                product: response.product
            }
        } catch (err) {
            return 
        }

    },
    data() {
        return {
            headline: "",
            body: "",
            photo: null,
            rating: 0,
            selectedFile: null,
            fileName: null
        };
    },
    methods: {
        onFileSelected(event) {
          if(event.target.files[0] !== undefined) {

              this.selectedFile = event.target.files[0];
              this.fileName = event.target.files[0].name;                
          } 
        },
        async onAddReview() {
            try {
              let data = new FormData();
              data.append("headline", this.headline);
              data.append("body", this.body);
              data.append("rating", this.rating);
              data.append("photo", this.selectedFile, this.selectedFile.name);
              console.log(this.$route.params.id)
              await this.$axios.$post(`/api/reviews/${this.$route.params.id}`, data);
                


              this.$router.push(`/products/${this.$route.params.id}`);                     
                 



            } catch (err) {
                return
            }
        }
    }
}
</script>