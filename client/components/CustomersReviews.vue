<template>
  <div>
    <hr />
    <div class="reviewsMedley">
      <div class="row">
        <div class="col-lg-4 col-md-5 col-sm-12">
          <!-- Total Customer reviews -->
          <span class="a-color-base">
            <h2>{{ product.reviews.length}} customer reviews</h2>
          </span>
          <div class="cr-widget-ACR">
            <span>
                <no-client>
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
                </no-client> 
              <span>
                {{product.averageRating}} out of 5 stars
                <i class="a-icon a-icon-popover"></i>
              </span>
            </span>
          </div>
          <div class="cr-widget-histogram" id="fiveStars">
            <div class="row a-histogrm-row">
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap">
                  <span>5 star</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
              <div class="col-md-8 col-sm-8 col-8 pr-0">
                <div>
                  <span>
                    <div class="a-meter 5star">
                      <div class="a-meter-bar a-meter-filled" :style="{width:  `${reviewPercents['five']}%`}"></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap text-right">
                  <span>{{reviewPercents["five"]}}%</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
            </div>
            <div class="row a-histogrm-row" style="margin-top: -15px;">
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap">
                  <span>4 star</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
              <div class="col-md-8 col-sm-8 col-8 pr-0">
                <div>
                  <span>
                    <div class="a-meter 5star">
                      <div class="a-meter-bar a-meter-filled" :style="{width:  `${reviewPercents['four']}%`}"></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap text-right">
                  <span>{{reviewPercents["four"]}}%</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
            </div>
            <div class="row a-histogrm-row" style="margin-top: -15px;">
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap">
                  <span>3 star</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
              <div class="col-md-8 col-sm-8 col-8 pr-0">
                <div>
                  <span>
                    <div class="a-meter 5star">
                      <div id="threeStars" class="a-meter-bar a-meter-filled" :style="{width:  `${reviewPercents['three']}%`}"></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap text-right">
                  <span>{{reviewPercents["three"]}}%</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
            </div>
            <div class="row a-histogrm-row" style="margin-top: -15px;">
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap">
                  <span>2 star</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
              <div class="col-md-8 col-sm-8 col-8 pr-0">
                <div>
                  <span>
                    <div class="a-meter 5star">
                      <div id="twoStars" class="a-meter-bar a-meter-filled" :style="{width:  `${reviewPercents['two']}%`}"></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap text-right">
                  <span>{{reviewPercents["two"]}}%</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
            </div>
            <div class="row a-histogrm-row" style="margin-top: -15px;">
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap">
                  <span>1 star</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
              <div class="col-md-8 col-sm-8 col-8 pr-0">
                <div>
                  <span>
                    <div class="a-meter 5star">
                      <div id="oneStars" class="a-meter-bar a-meter-filled" :style="{width:  `${reviewPercents['one']}%`}"></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap text-right">
                  <span>{{reviewPercents["one"]}}%</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
            </div>
            <div class="row a-histogrm-row" style="margin-top: -15px;">
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap">
                  <span>0 star</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
              <div class="col-md-8 col-sm-8 col-8 pr-0">
                <div>
                  <span>
                    <div class="a-meter 5star">
                      <div id="zeroStars" class="a-meter-bar a-meter-filled" :style="{width:  `${reviewPercents['zero']}%`}"></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-2 col-sm-2 col-2 pr-0">
                <div class="aok-nowrap text-right">
                  <span>{{reviewPercents["zero"]}}%</span>
                  <span class="a-letter-space"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix">
            <div class="float-left">
              <hr class="a-spacing-large" />
            </div>
          </div>
          <h3 class="a-spacing-micro">Review this product</h3>
          <div class="a-row a-spacing-large">Share your thoughts with other customers</div>
          <div class="a-row">
            <!-- Link to another Review page -->
            <span class="a-button-base writeReviewButton cm-cr-button-wide">
              <span class="a-button-inner">
                    <nuxt-link :to="`/reviews/${product._id}`" class="a-button-text">Write a customer review</nuxt-link>
              </span>
            </span>
          </div>
          <div class="clearfix">
            <div class="float-left">
              <hr class="mt-4 a-spacing-large" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-7 col-sm-12">
          <div class="cr-widget-focalreviews">
            <div class="card-padding">
              <div class="review-sort-type">
                <span class="a-dropdown-container">
                  <span class="a-button a-button-dropdown">
                    <span class="a-button-inner">
                      <span class="a-button-text">
                        <span class="a-dropdown-prompt">Reviews</span>
                      </span>
                      <i class="a-icon a-icon-dropdown"></i>
                    </span>
                  </span>
                </span>
              </div>

              <!-- Reviews -->
              <div class="review-body" v-for="review in reviews" :key="review._id">
                <div class="genome-widget">
                  <span>
                    <div class="profile-avatar">
                      <img height="150" width="150" alt="Owner Image"
                        src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                      />
                    </div>
                    <!-- Review Owner -->
                    <div class="profile-content">
                      <span class="a-profile-name">{{review.user.name}}</span>
                    </div>
                  </span>
                </div>
                <div class="a-row">
                  <!-- Review Star -->
                  <span>
                    <i class="fas fa-star" v-for="i in review.rating" :key="i"></i>
                  </span>
                  <span class="a-letter-space"></span>
                  <!-- Review Headline -->
                  <span class="review-title">{{review.headline}}</span>
                </div>
                <div class="review-data">

                </div>
                <!-- Review Body -->
                <div class="review-body">
                  <span>{{review.body}}</span>
                </div>
              </div>
              <!-- Reviews -->
            </div>
          </div>
          <div class="review-footer">
            <div class="a-row">
              <span class="a-button a-button-base writeReviewButton" id="a-autoid-15">
                <span class="a-button-inner">
                    <nuxt-link :to="`/reviews/${product._id}`" class="a-button-text">Write a customer review</nuxt-link>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-md-0 col-sm-0"></div>
      </div>
    </div>
  </div>
</template>


<script>

import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  props: ["product", "reviews", "reviewPercents"]

};
</script>

