import {api} from './baseApi';

const loginUrl = '/login';

export default {
    /**
     * Login user
     * 
     * @param email {string}
     * @param password {string}
     * @return {Promise}
     */
    login: (email, password) => {
        return api.post(
            loginUrl, 
            JSON.stringify(
                {
                    email,
                    password
                }
            )
        );
    }
};