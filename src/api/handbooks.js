import {api} from './baseApi';

const categoriesUrl = '/handbooks/categories';
const bannerPlacesUrl = '/handbooks/banner-places';

export default {

    /**
     * Get all categories
     * 
     * @return {Promise}
     */
    categories: () => {
        return api.get(categoriesUrl);
    },

    /**
     * Get all banner places
     * 
     * @return {Promise}
     */
    bannerPlaces: () => {
        return api.get(bannerPlacesUrl);
    }

};