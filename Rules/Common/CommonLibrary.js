import libVal from './ValidationLibrary';
import libThis from './CommonLibrary';
import IsAndroid from './IsAndroid';
import Logger from './Logger';


export default class {
    /**
     * Evaluates a target path to find value
     * Returns whatever the target path evaluated to, or empty string if the target returned null or did not exist
     * params:
     * @param {string} path - target path
     * @param {string} key - name to use when storing value in dictionary
     * @param {object} dict - dictionary object to store result
     * @param {boolean} trim - whether to trim a string result of leading and trailing spaces
     */
    static getTargetPathValue(clientAPI, path, key, dict, trim = false) {
        let value = null;
        try {
            value = clientAPI.evaluateTargetPath(path);
        } catch (err) {
            /**Implementing our Logger class*/
            //Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryCommon.global').getValue(), 'getTargetPathValue: ' + err.message);
        }

        if (libVal.evalIsEmpty(value)) value = ''; //SnowBlind is returning undefined for screen controls that have no value :-(
        if (trim && (typeof value === 'string')) value = value.trim();
        if (dict) {
            dict[key] = value;
        }
        return value;
    }

    /**
     * Return the error string from an action result
     * @param {String} key Key used in the action result metadata
     */
    static getActionResultError(context, key) {
        let targetPath = '#ActionResults:' + key + '/#Property:error';
        let errorString = context.evaluateTargetPath(targetPath);
        // Remove error code and 'Error Descrition" from the message string
        let error = errorString.message.replace(/\[(.*)\]\s*/g, '').replace(/Error description:\s*/g, '');
        return error;
    }
}
