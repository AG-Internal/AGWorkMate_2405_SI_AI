/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TOIPS_OnSelectionChange(clientAPI) {
    var oTable = clientAPI.getPageProxy().getControl('SectionedTable0').getSection('SectionObjectTable0');

    var oSelection = oTable.getSelectionChangedItem();
    var oSelBinding = oSelection.binding;
    var selectedIndex = oSelBinding.Index;

    if(oSelection.selected){
        ImageAnal._aSummarySelectedIndices.push(selectedIndex);
    }else{
        //splice
        var arrayindex = ImageAnal._aSummarySelectedIndices.indexOf(selectedIndex);
        if (arrayindex >= 0) { // only splice array when item is found
            ImageAnal._aSummarySelectedIndices.splice(arrayindex, 1); // 2nd parameter means remove one item only
          }
    }
}
