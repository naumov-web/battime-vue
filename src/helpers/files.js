export default {
    /**
     * Convert file to base64
     * 
     * @param {*} file
     * @returns Promise
     */
    toBase64(file) {
        return new Promise((resolve, reject) => {
        
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);

        });
    }
};