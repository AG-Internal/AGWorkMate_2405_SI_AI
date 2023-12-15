/* Attachment Utility Class for SI pages */
export class AttachmentUtil {
    /**********************************************************
     * Init
    **********************************************************/
    static initKeys() {
        //Keys of Attachment Entity , default values
        this._oAttachKeys = {
            OrderNumber: "XXXX",
            TechnicalObject: "XXXX",
            InspectionSampleNumber: "000000",
            NodeNumber: "00000000",
            MicNumber: "0",
            MultipleSample: "0000",
            InspectionCharacteristicNumb: "0000"
        };
    } //Init

    /**********************************************************
* Query Builder
**********************************************************/
    static getAttachmentListQuery() {

        var sQuery = `$filter=OrderNumber eq '${this._oAttachKeys.OrderNumber}' and NodeNumber eq '${this._oAttachKeys.NodeNumber}' 
         and InspectionSampleNumber eq '${this._oAttachKeys.InspectionSampleNumber}' and MicNumber eq '${this._oAttachKeys.MicNumber}'
         and InspectionCharacteristicNumb eq '${this._oAttachKeys.InspectionCharacteristicNumb}' and MultipleSample eq '${this._oAttachKeys.MultipleSample}'`;
        return sQuery;
    }
    /**********************************************************
  * SETTER
 **********************************************************/

    static setKeysFromTechObjectBinding(poBinding) {
        /** Set Keys From Technical Object Binding */
        AttachmentUtil.initKeys();//Init Keys
        //Pass the Keys
        this._oAttachKeys.OrderNumber = poBinding.OrderNumber;//Order No
        this._oAttachKeys.TechnicalObject = poBinding.TechnicalObject;//tech Object
        this._oAttachKeys.InspectionSampleNumber = poBinding.InspectionSampleNumber;//Probenr

    }
}