<template>
    <div class="registerPage">
        <div class="container">
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">

                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-large">
                            <div class="a-box-inner">
                                <h1  class="a-spacing-small">Create Account</h1>
                                <!--- Your Name --->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name1" class="a-form-label">Your name</label>
                                    <input type="text"
                                        v-model="name"
                                        id="ap_customer_name1" 
                                        class="a-input-text form-control auth-authofocus auth-required-field auth-contact-verification-request-info" >
                                </div>
                                <!--- Your Email --->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name2" class="a-form-label">Your Email</label>
                                    <input v-model="email" type="email"
                                        id="ap_customer_name2" 
                                        class="a-input-text form-control auth-authofocus auth-required-field auth-contact-verification-request-info" >
                                </div>
                                <!--- Your Password --->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name3" class="a-form-label">Your Password</label>
                                    <input v-model="password" type="password"
                                        id="ap_customer_name3" 
                                        class="a-input-text form-control auth-authofocus auth-required-field auth-contact-verification-request-info" >
                                    <div class="a-alert-container">
                                        <div class="a-alert-content">Password must be at least 6 characters</div>
                                    </div>
                                </div>
                                <!---- Button --->
                                <div class="a-row a-spacing-extra-large mb-4">
                                    <div class="a-row a-spacing-extra-large mb-4">
                                        <span class="mt-auto">
                                            <span style="width: 100%" id="button" class="btn mt-auto" @click='onSignUp'>Create Account</span>
                                        </span>
                                    </div>
                                </div>
                                <hr>
                                <div class="a-row">
                                    <b>Already have an account?
                                        <nuxt-link to="/login">Sign In</nuxt-link>
                                    </b>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    *{
        font-family: 'Courier New', monospace;
    }
    h1, span {
        font-family: 'Courier New', monospace;
    }
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
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return{
            name: "",
            email: "",
            password: ""
        }

    },
    methods: {
        async onSignUp() {
            try {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }

            let result = await this.$axios.$post('/api/auth/signup' , data);


            if(result.success) {
                this.$auth.loginWith("local", {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                });

                this.$router.push("/");
            }

            } catch (err) {
                return
            }
        }
    }
}
</script>