/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TOIP_CallChatGPTAPI(clientAPI) {
    var sIdActInd = clientAPI.showActivityIndicator("AI Eyes on the Prize: Analyzing Images for Insights, Results Soon...");
    var oBody = ImageAnal._oAIChatData;


    clientAPI.sendRequest("/openai/chat/completions", {
        method: "POST",
        body: oBody
    }).then(function (response) {

        //Parse the Data set it in Global
        let data = JSON.parse(response.content.getData());
        //on Success
        if (response.statusCode === 200) {
            var oMessage = data.choices[0].message;
            //Set Response to Image Anal
            ImageAnal.setAIResponseMessage(oMessage.content);
            //alert(oMessage.content);
        } else {
            alert(response.statusCode);
        }

        //process the response
        ImageAnal.ProcessAIResponseToArray();
        // var sMessage = oMessage.content;
        // sMessage = sMessage.replace("```json", "");
        // sMessage = sMessage.replace("```", "");

        // var aInsp = JSON.parse(sMessage);
        // var sTempMsg = aInsp.length + "";
        // alert(sTempMsg + aInsp[0].Result);
        //Close the Indicator
        clientAPI.dismissActivityIndicator(sIdActInd);

        clientAPI.executeAction("/SmartInspections/Actions/ImageAnal/TOIP_NavToVisionSummary.action");

    }).catch(function (error) {
        var eMessage = error.message;
        // Handle errors that occur during the request
        alert('Request Error: ' + eMessage);
        clientAPI.dismissActivityIndicator(sIdActInd);
    });


}
