/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { getTrailingItems } from './ContextMenuItems';
export default function TrailingItems(clientAPI) {

    var sCallFor = "";
    var binding = clientAPI.binding;

    if (binding.MicDescopeType !== '') {
        sCallFor = "DESCOPED";
    } else if (binding.FixedValuesResult !== "") {
        sCallFor = "HAS_RESULT";
    } else {
        sCallFor = "NO_RESULT";
    }

    return getTrailingItems(sCallFor);
}
