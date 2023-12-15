/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TechObj_VisionButtonEnabled(clientAPI) {
    var binding = clientAPI.getPageProxy().binding;
    var orderNumber = binding.OrderNumber;
    var technicalObject = binding.TechnicalObject;
    var descopeType = binding.DescopeType;
    var techStatus = binding.Status;
    if (descopeType !== '' || techStatus === 'P') {
        //if Descoped or Perm saved
        return false;
    }
    return true;
}
