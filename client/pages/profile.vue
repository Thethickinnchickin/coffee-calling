<template>


    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2>Profile Page</h2>
                    <nuxt-link to="/" style="color:#000080" ><span @click="onLogOut">Logout</span></nuxt-link>
                    <form>
                    <!--- Name -->    
                        <div class="a-spacing-top-medium">
                            <label for="name" style="width: 100%">Name</label>
                            <input name="name" style="width: 100%" v-model="name" class="a-input-text" :placeholder="$auth.$state.user.name">
                        </div>
                    <!--- Email -->    
                        <div class="a-spacing-top-medium">
                            <label for="email" style="width: 100%">Email</label>
                            <input name="email" style="width: 100%" v-model="email" class="a-input-text" :placeholder="$auth.$state.user.email">
                        </div>
                    <!--- Password -->    
                        <div class="a-spacing-top-medium">
                            <label for="password" style="width: 100%">Password</label>
                            <input id="password" type="password" style="width: 100%" v-model="password" class="a-input-text" >
                        </div>

                    <!--- Button --->
                    <hr/>
                    <div class="a-spacing-top-large">
                        <span class="a-button-register">
                            <span class="a-button-inner">
                                <button style="background-color: #2e0000; color: white; font-family: 'Courier New', monospace;" class="a-button-text" @click="onUpdateProfile">Update Profile</button>
                            </span>
                        </span>
                    </div>
                    </form>
                    <br />
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>

                       
</template>

<script>
export default {
    data(){
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods:{
        async onUpdateProfile() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            try{
                let response = await this.$axios.$put('/api/auth/user', data);

                if(response.success) {
                    this.name = "";
                    this.email = "";
                    this.password = "";


                    await this.$auth.fetchUser();

        
                }
            } catch (err) {
                return
            }
        },
        async onLogOut() {
            await this.$auth.logout();
        }
    }
}
</script>