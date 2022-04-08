
<template>
  <!--MAIN-->
  <main>
    <!--REGISTER ADDRESS-->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-section a-spacing-medium">
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  <li>
                    <a href="#">
                      <span>Your Account</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li>
                    <a href="#">
                      <span style="font-family: 'Courier New', monospace;">Your Adresses</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li class="active">
                    <a href="#">
                      <span>New Address</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2>Update address</h2>

              <!-- Error Message -->
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b></b>
              </div>
              <form>
                <div class="a-spacing-medium a-spacing-top-medium">
                  <!-- Country / Region -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Country/Region</label>
                    <select v-model="country"   class="a-select-option">
                      <option  v-for="country in countries" :key="country._id" :value="country.name.common">{{country.name.common}}</option>
                      <option></option>
                    </select>
                  </div>
                  <!-- Full name -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Full Name</label>
                    <input v-model="fullName" :placeholder="address.fullName" type="text" class="a-input-text" style="width: 100%;" />
                  </div>
                  <!-- Street Address -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Street Address</label>
                    <input
                     v-model="streetAddress"
                     
                      type="text"
                      class="a-input-text"
                      style="width: 100%;"
                      :placeholder="address.streetAddress || 'Street and number, P.O. box, c/o.'"
                    />
                    <!-- Street Address 2 -->
                    <input
                      v-model="streetAddress2"
                      type="text"
                      class="a-input-text a-spacing-top-small"
                      style="width: 100%;"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>
                  <!-- City -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">City</label>
                    <input v-model="city" :placeholder="address.city" type="text" class="a-input-text" style="width: 100%;" />
                  </div>
                  <!-- State -->
                  <div  class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">State / Province / Region</label>
                    <input v-model="state" :placeholder="address.state" type="text" class="a-input-text" style="width: 100%;" />
                  </div>
                  <!-- Zip Code -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Zip Code</label>
                    <input v-model="zipCode" :placeholder="address.zipCode" type="text" class="a-input-text" style="width: 100%;" />
                  </div>
                  <!-- Phone Number -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Phone Number</label>
                    <input v-model="phoneNumber" :placeholder="address.phoneNumber" type="text" class="a-input-text" style="width: 100%;" />
                    <div class="a-section a-spacing-none a-spacing-top-micro">
                      <span class="a-size-mini">May be used to assist delivery</span>
                    </div>
                  </div>
                  <div class="a-spacing-base a-spacing-top-medium">
                    <h3>Add delivery instructions</h3>
                  </div>
                  <!-- Delivery Instruction -->
                  <div class="a-spacing-top-medium">
                    <label
                      style="margin-bottom: 0px;"
                    >Do we need additional instructions to find this address?</label>
                    <textarea
                      v-model="deliveryInstructions"
                      :placeholder="address.deliveryInstructions || 'Provide details such as building description, a nearby landmark,or other navigation instructions'"
                      style="height:6em; width: 100%;"
                    ></textarea>
                  </div>
                  <!-- Security code -->
                  <div class="a-spacing-top-medium">
                    <label
                      style="margin-bottom: 0px;"
                    >Do we need a security code or a call box number to access this building?</label>
                    <input type="text" class="a-input-text" style="width: 100%;" placeholder="1234" />
                  </div>
                  <div class="a-spacing-top-medium">
                  </div>
                  <div class="a-spacing-top-medium"></div>
                  <hr />
                  <div class="a-spacing-top-large">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <button style="background-color: #2e0000; color: white; font-family: 'Courier New', monospace;" class="a-button-text" @click="onAddressUpdate(address._id)">Update address</button>
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
    <!--/REGISTER ADDRESS-->
  </main>
  <!--/MAIN-->
</template>


<style scoped>
a {
  
  color: #0047AB;
}
</style>

<script>
export default {
  
  async asyncData({ $axios, params }) {
    let countries = $axios.$get('/api/countries');
    let address = $axios.$get(`/api/address/${params.id}`);

    let [countriesResponse, addressResponse] = await Promise.all([
        countries,
        address
    ]);


    return {
      countries: countriesResponse,
      address: addressResponse.address
    }
  },
  data() { 
    return {
      country: "",
      fullName: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: null,
      phoneNumber: null,
      deliveryInstructions: "",
      securityCode: ""    
    }

  },
  methods: {  
    async onAddressUpdate(id) {
      try {
        let addressData = {
          country: this.country,
          fullName: this.fullName,
          streetAddress: this.streetAddress + " " + this.streetAddress2,
          city: this.city,
          state: this.state,
          zipCode: this.zipCode,
          phoneNumber: this.phoneNumber,
          deliveryInstructions: this.deliveryInstructions,
          securityCode: this.securityCode
        };


        let response = await this.$axios.$put(`/api/address/${id}`, addressData);
        
     
        this.$router.back();
        

      } catch (err) {
        return 
      }
    }
  }
}
</script>