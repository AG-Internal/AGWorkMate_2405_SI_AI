/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { getLeadingItems } from './ContextMenuItems';
export default function LeadingItems(clientAPI) {
    var sCallFor = "";
    var binding = clientAPI.binding;

    if (binding.MicDescopeType !== '') {
        sCallFor = "DESCOPED";
    } else if (binding.FixedValuesResult !== "") {
        sCallFor = "HAS_RESULT";
    } else {
        sCallFor = "NO_RESULT";
    }
    return getLeadingItems(sCallFor);
}
