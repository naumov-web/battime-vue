import {apiAuth} from './baseApi';

const bannersUrl = '/banners';
const bannersItemUrl = '/banners/:id';

export default {

    /**
     * Get banners list
     * 
     * @returns Promise
     */
    fetch: () => {
        return apiAuth.get(bannersUrl);
    },

    /**
     * Get banners item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    fetchOne: (id) => {
        return apiAuth.get(bannersItemUrl.replace(':id', id));
    },

    /**
     * Create banners item
     * 
     * @param {*} payload
     * @returns Promise
     */
    create: (payload) => {
        return apiAuth.post(bannersUrl, JSON.stringify(payload));
    },

    /**
     * Update banners item
     * 
     * @param {Integer} id
     * @param {*} payload
     * @returns Promise
     */
    update: (id, payload) => {
        return apiAuth.put(bannersItemUrl.replace(':id', id), JSON.stringify(payload));
    },

    /**
     * Delete banners item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    delete: (id) => {
        return apiAuth.delete(bannersItemUrl.replace(':id', id));
    },

};