/**
* Show/hide characteristic edit button based on User Authorization
* @param {IClientAPI} context
*/
import enableEquipEdit from '../../../SAPAssetManager/Rules/UserAuthorizations/Equipments/EnableEquipmentEdit';
import enableFlocEdit from '../../../SAPAssetManager/Rules/UserAuthorizations//FunctionalLocations/EnableFunctionalLocationEdit';
export default function EnableCharEdit(context) {
    let entityType = context.evaluateTargetPathForAPI('#Page:-Previous').binding['@odata.type'];
    if (entityType === '#sap_mobile.MyEquipClass' || entityType === '#sap_mobile.MyFuncLocClass') { // Need to back up one more page
        entityType = context.evaluateTargetPathForAPI('#Page:-Previous/#Page:-Previous').binding['@odata.type'];
    }
    switch (entityType) {
        case '#sap_mobile.MyEquipClass':
            return false;
            // return enableEquipEdit(context);
        case '#sap_mobile.MyFuncLocClass':
            return false;
            // return enableFlocEdit(context);
        case '#AGCAPPS.SMTINS_AM_SRV.TechnicalObjectDetails':
                return true;    
        default:
            return false;
    }
}
