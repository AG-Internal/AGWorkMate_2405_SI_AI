/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { GetDataUtil } from "../SIData/GetDataUtil";
import { TextTemp } from "./TextTemp";
import ChatGPTOpenInputPage from "./ChatGPTOpenInputPage";
export default function ChatGPTTextAPICall(clientAPI) {
    /* call the ChatGPT API */
    var sIdActInd = clientAPI.showActivityIndicator("Your AI technician is on the case...");
    var oBody = TextTemp._aiChatData;

    clientAPI.sendRequest("/openai/chat/completions", {
        method: "POST",
        body: oBody
    }).then(function (response) {
        alert(response.statusCode);
        let data = JSON.parse(response.content.getData());
        //on Success
        if (response.statusCode === 200) {
            var oMessage = data.choices[0].message;
            TextTemp.aiAppendChatData(oMessage);
            alert(oMessage.content);
        }
        //Close the Indicator
        clientAPI.dismissActivityIndicator(sIdActInd);
        //Open the page
        ChatGPTOpenInputPage(clientAPI);

    }).catch(function (error) {
        var eMessage = error.message;
        // Handle errors that occur during the request
        alert('Request Error: ' + eMessage  );
        clientAPI.dismissActivityIndicator(sIdActInd);
    });
}
