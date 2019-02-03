import {apiAuth} from './baseApi';

const newsUrl = '/news';
const newsItemUrl = '/news/:id';

export default {

    /**
     * Get news list
     * 
     * @returns Promise
     */
    fetch: () => {
        return apiAuth.get(newsUrl);
    },

    /**
     * Get news item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    fetchOne: (id) => {
        return apiAuth.get(newsItemUrl.replace(':id', id));
    },

    /**
     * Create news item
     * 
     * @param {*} payload
     * @returns Promise
     */
    create: (payload) => {
        return apiAuth.post(newsUrl, JSON.stringify(payload));
    },

    /**
     * Update news item
     * 
     * @param {Integer} id
     * @param {*} payload
     * @returns Promise
     */
    update: (id, payload) => {
        return apiAuth.put(newsItemUrl.replace(':id', id), JSON.stringify(payload));
    },

    /**
     * Show news item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    showOne: (id) => {
        return apiAuth.put(newsItemUrl.replace(':id', id) + '/show');
    },

    /**
     * Hide news item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    hideOne: (id) => {
        return apiAuth.put(newsItemUrl.replace(':id', id) + '/hide');
    },

    /**
     * Delete news item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    delete: (id) => {
        return apiAuth.delete(newsItemUrl.replace(':id', id));
    },

};