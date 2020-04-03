import * as React from 'react';
var AWS = require('aws-sdk/dist/aws-sdk-react-native');
var credentials = require("./config.json");
import { Buffer } from 'buffer';

 
var sagemakerruntime = new AWS.SageMakerRuntime({accessKeyId: credentials.accessKeyId, 
    secretAccessKey: credentials.secretAccessKey, region: "us-east-2",});
 
const endpoint_name = "skin-classification-endpoint--4-2-2020"; 
const BASE64_MARKER = ';base64,';
const conditions = ["Acne", "Melanoma", "Warts"];

export function useEndpoint(image) {
    // image is { uri: ''', base64: ''', }
    var result = convertDataURIToBinary("data:image/jpeg;base64,"+image.base64);   

    const [queryState, setQueryState] = React.useState({ isLoading: true, data: null, err: null });
    React.useEffect(() => {
        sagemakerruntime.invokeEndpoint({
            Body: result,
            EndpointName: endpoint_name,
            ContentType: "application/x-image", 
        }, function(err, data) {
            if(err) {
                setQueryState({ isLoading: false, data: null, err: err.message})
            }
            else {
                let prediction = convertResponseToJSON(data.Body);
                setQueryState({ isLoading: false, data: prediction, err: null})
            }
        });
    }, []);
    return queryState;
}


function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length; var i;
    var base64 = dataURI.substring(base64Index);
    var raw = atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return array;
}

function convertResponseToJSON(responseBuffer) {
    const predictionValues = JSON.parse(responseBuffer.toString());
    console.log(predictionValues);
    
    const prediction = {
        labels: conditions,
        datasets: [
            {
                data: predictionValues.map((x) => { return x * 100; }),
            },
        ],
    }

    return prediction;
}