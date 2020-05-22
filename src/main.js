import { createApp, provide, inject } from 'vue';
import App from './App.vue'
import router from './router'

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { useAuth0 } from "./auth";

const app = createApp(App);


const user = useAuth0()

function Auth0Plugin(options) {
  provide(user, options)
}

function useStore(options) {
  const store = inject(Auth0Plugin(options))
  if (!store) {
    // throw error, no store provided
  }
  return store
}

// Install the authentication plugin here
app.use(useStore, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

app.config.productionTip = false;

app.use(router);

router.isReady().then(() => {
    app.mount('#app');
});