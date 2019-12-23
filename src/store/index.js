import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import router from '../router';

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store =  new Vuex.Store({
    store,
    router,
    plugins: [createPersistedState()]
});

export default store;