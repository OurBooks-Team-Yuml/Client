<template>
    <div class="home">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">

            <!-- show login when not authenticated -->
            <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
            <div v-if="$auth.isAuthenticated">
                <h1 v-if="$auth.isAuthenticated">{{ $auth.user.name }}</h1>

                <!-- shwo token after generate -->
                <div> {{ token }} </div>
                <button @click="getToken">get token</button>

                <!-- show logout when authenticated -->
                <button  @click="logout">Log out</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "home",

    data() {
        return {
            //This will be moved to global store.
            token: null,
        };
    },

    methods: {
        //This will be moved to global store.
        async getToken() {
            this.token = await this.$auth.getTokenSilently();
        },

        // Log the user in
        login() {
            this.$auth.loginWithRedirect();
        },

        // Log the user out
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        }
    }
};
</script>