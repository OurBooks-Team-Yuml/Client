import { createApp } from 'vue';
import App from './App.vue'
import router from './router'

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

createApp(App).use(router).mount("#app");