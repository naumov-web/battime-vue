import {apiAuth} from './baseApi';

const questionsUrl = '/questions';
const questionsItemUrl = '/questions/:id';

export default {

    /**
     * Get questions list
     * 
     * @returns Promise
     */
    fetch: () => {
        return apiAuth.get(questionsUrl);
    },

    /**
     * Get question item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    fetchOne: (id) => {
        return apiAuth.get(questionsItemUrl.replace(':id', id));
    },

    /**
     * Create question item
     * 
     * @param {*} payload
     * @returns Promise
     */
    create: (payload) => {
        return apiAuth.post(questionsUrl, JSON.stringify(payload));
    },

    /**
     * Update question item
     * 
     * @param {Integer} id
     * @param {*} payload
     * @returns Promise
     */
    update: (id, payload) => {
        return apiAuth.put(questionsItemUrl.replace(':id', id), JSON.stringify(payload));
    },

    /**
     * Enable question item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    enableOne: (id) => {
        return apiAuth.put(questionsItemUrl.replace(':id', id) + '/enable');
    },

    /**
     * Disable question item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    disableOne: (id) => {
        return apiAuth.put(questionsItemUrl.replace(':id', id) + '/disable');
    },

    /**
     * Delete question item
     * 
     * @param {Integer} id
     * @returns Promise
     */
    delete: (id) => {
        return apiAuth.delete(questionsItemUrl.replace(':id', id));
    },

};
