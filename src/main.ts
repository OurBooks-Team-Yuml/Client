import { createApp } from 'vue';
import router from './router'
import store from './store'
import App from './App.vue'


import Auth0 from './auth/index';

const app = createApp(App);

app.use(Auth0);
app.use(router);
app.use(store);

router.isReady().then(() => {
    app.mount('#app');
});
