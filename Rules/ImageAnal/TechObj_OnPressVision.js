/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TechObj_OnPressVision(clientAPI) {
    /* On Press Vision Button at Techncal Object Screen */
    ImageAnal.initGlobals();//Init Globals
    var oTechObjectBinding = clientAPI.getPageProxy().binding;//Tech object Binding
    ImageAnal.setTechObjectBinding(oTechObjectBinding);    //Set it to Global Class Param

    //Calling the Promise to Update Data in Class Global
    return ImageAnal.getInspectionData(clientAPI).then(function (result) {
        //Navigate to Analysis page
        clientAPI.executeAction("/SmartInspections/Actions/ImageAnal/TechObj_NavToImageInspection.action");
    }).catch((error) => {
        alert('Sorry an Error Occured while fetching Data Inspection Data');
    });

}
