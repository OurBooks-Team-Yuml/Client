import { createApp } from 'vue';
import App from './App.vue'
import router from './router'

import Auth0 from './auth/index';

const app = createApp(App);

app.use(Auth0);
app.use(router);

router.isReady().then(() => {
    app.mount('#app');
});
