const storage = localStorage;

export default {
    /**
     * Storage class
     */
    /**
     * Get item from storage
     * 
     * @param key {string}
     * @returns {*}
     */
    getItem: (key) => {
        return storage.getItem(key);
    },
    /**
     * Set item in storage
     * 
     * @param key {string}
     * @param value {*}
     * @returns void
     */
    setItem: (key, value) => {
        storage.setItem(key, value);
    }
};