import storage from './storage';

const authTokenKey = 'auth_token';

export default {

    /**
     * Set auth token
     * 
     * @param token {string}
     * @returns void
     */
    setAuthToken: (token) => {
        storage.setItem(authTokenKey, token);
    },

    /**
     * Check is user authorized
     * 
     * @return {boolean}
     */
    checkIsAuth: () => {
        return storage.getItem(authTokenKey) ? true : false;
    },

    /**
     * Get auth token
     * 
     * @return {string}
     */
    getAuthToken: () => {
        return storage.getItem(authTokenKey);
    },

    /**
     * Delete auth token
     * 
     * @returns void
     */
    deleteAuthToken: () => {
        storage.setItem(authTokenKey, null);
    }
};