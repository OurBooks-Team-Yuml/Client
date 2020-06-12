<template>
    <div class="home">
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
            <div v-if="$auth.isAuthenticated">
                <h1 v-if="$auth.isAuthenticated">{{ $auth.user.name }}</h1>

                <!-- shwo token after generate -->
                <div> {{ state.token }} </div>
                <button @click="getToken">get token</button>

                <!-- show logout when authenticated -->
                <button  @click="logout">Log out</button>
                {{ test }}
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useAuth0 } from './../auth/index.ts';
import { useStore } from 'vuex'

export default {
    name: 'Home',

    async setup() {
        const state = reactive({
            token: null,
        })

        const store = useStore()

        // this is only for test for test sore is work. TOOD delete this.
        const test = computed(() => store.state.test)

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
            test
        }
    },
};
</script>
