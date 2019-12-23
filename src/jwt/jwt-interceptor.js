import axios from 'axios';
import { router } from '../router/index.js';

export default () => {
    axios.interceptors.response.use( (response) => {
        // Return successful response
        return response;
    }, (error) => {
        // Return error if no auth.
        if (error.response.status !== 401) {
            return Promise.reject((resolve, reject) => {
            reject(error);
        });
    }

        if (error.config.url == '' || error.response.message == 'Account is disabled.') {
            TokenStorage.clear();
            router.push({ name: '' });

            return Promise.reject((resolve, reject) => {
                reject(error);
            });
        }
    });
}