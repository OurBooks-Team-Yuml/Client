import { inject, provide } from 'vue';
import router from '../router'
import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";

let instance: any;

const getAuth0Instance = () => {
    if (instance) return instance;

    instance = createAuth0Instance()

    return instance;
};

interface Auth0 {
    loading: boolean
    popupOpen: boolean

    user: Record<string, string>
    error: string | null

    isAuthenticated: boolean

    loginWithRedirect(): any
    getIdTokenClaims(): any
    getTokenSilently(): Promise<string>
    getTokenWithPopup(): Promise<string>
    logout(): any
}

export async function createAuth0Instance(): Promise<Auth0> {
    let loading = false;
    let user = {};
    let popupOpen = false;
    let error = null;
    let isAuthenticated = false;

    let auth0Client: Auth0Client;

    async function initClient(): Promise<void> {
        auth0Client = await createAuth0Client({
            domain: "dev-b5gefs5h.eu.auth0.com",
            client_id: "5g2iAThsMyeOlM4Lo09ogdvyH2w1B6Eg",
            redirect_uri: window.location.origin,
        });

        try {
            if (
                window.location.search.includes("code=") &&
                window.location.search.includes("state=")
            ) {
                const { appState } = await auth0Client.handleRedirectCallback();

                router.push(
                    appState && appState.targetUrl
                        ? appState.targetUrl
                        : window.location.pathname
                );
            }
        } catch (e) {
            error = e;
        } finally {
            isAuthenticated = await auth0Client.isAuthenticated();
            user = await auth0Client.getUser();
            loading = false;
        }
    }

    await initClient();

    function loginWithRedirect() {
        return auth0Client.loginWithRedirect();
    }

    function getIdTokenClaims() {
        return auth0Client.getIdTokenClaims();
    }

    function getTokenSilently() {
        return auth0Client.getTokenSilently();
    }

    function getTokenWithPopup() {
        return auth0Client.getTokenWithPopup();
    }

    function logout(...options: any) {
        return auth0Client.logout(options);
    }

    return {
        loading,
        error,
        user,
        popupOpen,
        isAuthenticated,
        loginWithRedirect,
        getIdTokenClaims,
        getTokenSilently,
        getTokenWithPopup,
        logout,
    }
}

const AUTH0_SERVICE = Symbol();

export default function install(app: any): void {
    const instance = getAuth0Instance();

    app.provide(AUTH0_SERVICE, instance);
    app.config.globalProperties.$store = instance;
}

export function Auth0Service(): void {
    provide(AUTH0_SERVICE, getAuth0Instance())
}

export function useAuth0() {
    return inject(AUTH0_SERVICE);
}
