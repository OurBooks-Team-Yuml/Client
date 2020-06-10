<template>
    <div class="home">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            {{ isAuthenticated }}
            <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
            <div v-if="$auth.isAuthenticated">
                <h1 v-if="$auth.isAuthenticated">{{ $auth.user.name }}</h1>

                <!-- shwo token after generate -->
                <div> {{ state.token }} </div>
                <button @click="getToken">get token</button>

                <!-- show logout when authenticated -->
                <button  @click="logout">Log out</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { Auth0Service, useAuth0 } from './../auth/index.js';

export default {
    name: 'Home',

    async setup() {
        const state = reactive({
            token: null,
        })

        Auth0Service()
        let $auth = await useAuth0()

        function login() {
            this.$auth.loginWithRedirect();
        }

        function logout() {
            this.$auth.logout({returnTo: window.location.origin})
        }

        async function getToken() {
            state.token = await this.$auth.getTokenSilently();
        }

        return {
            state,
            login,
            getToken,
            logout,
            $auth,
        }
    }
};
</script>