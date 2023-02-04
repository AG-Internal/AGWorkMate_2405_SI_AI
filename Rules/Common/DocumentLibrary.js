export default class {
    /**
     * Formats the file size is a more readable way
     * @param {string} rawFileSize the size from the document object as a string
     * @return {Promise} a promise of true if media is local.
     * 
     * @memberof DocumentEventLibrary
     */
    static formatFileSize(rawFileSize, context) {
        if (rawFileSize) {
            const intValue = parseInt(rawFileSize);
            if (intValue > (1024 * 1024 * 1024)) {
                return Math.round(intValue / (1024 * 1024 * 10.24)) / 100 + ' GB';
            } else if (intValue > (1024 * 1024)) {
                return Math.round(intValue / (1024 * 10.24)) / 100 + ' MB';
            } else if (intValue > 1024) {
                return Math.round(intValue / 10.24) / 100 + ' KB';
            } else {
                if (intValue === 0) {
                    return context.localizeText('unknown');
                }
                return intValue;
            }
        }
        return '';
    }
}
