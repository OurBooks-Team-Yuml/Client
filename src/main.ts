import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import Auth0 from './auth/index'

// Apollo configuration
const apolloClient = new ApolloClient({
    //uri: ''
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

const app = createApp(App)

app.use(Auth0)
app.use(router)
app.use(store)
app.use(apolloProvider)

router.isReady().then(() => {
    app.mount('#app');
});
