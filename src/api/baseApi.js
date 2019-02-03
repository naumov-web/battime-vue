import axios from 'axios';
import auth from '../helpers/auth';

const host = 'http://battime.loc';
const baseUrl = host + '/api';

axios.defaults.headers.common['Content-type'] = 'application/json';

export const api = axios.create({
    baseURL: baseUrl
});

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${auth.getAuthToken()}`,
    },
});

instance.interceptors.response.use(response => {
    return response;
 }, error => {
    if (error.response && error.response.status === 401) {
        auth.deleteAuthToken();
        document.location.href = '/login';
    }
    return error;
});

export const apiAuth = instance;