import * as React from 'react';
var AWS = require('aws-sdk/dist/aws-sdk-react-native');
var credentials = require("./awsConfig.json");
 
var sagemakerruntime = new AWS.SageMakerRuntime({accessKeyId: credentials.accessKeyId, 
    secretAccessKey: credentials.secretAccessKey, region: "us-east-2",});
 
const endpoint_name = "skinnefy-training-version2-endpoint"; 
const conditions = ["Acne", "Eczema", "Light Disease", "Melanoma", "Nail Fungus",
                    "Psoriasis", "Scabies", "Seborrheic Keratoses", "Ringworm", "Warts"];

export function useEndpoint(image) {
    const [queryState, setQueryState] = React.useState({ isLoading: true, data: null, err: null });

    // convert the base64 encoding string to uint8 typearray
    var result = convertToArray(image.base64);   
    React.useEffect(() => {
        sagemakerruntime.invokeEndpoint({
            Body: result,
            EndpointName: endpoint_name,
            ContentType: "application/x-image", 
        }, function(err, data) {
            if(err) {
                setQueryState({ 
                    isLoading: false, 
                    data: null, 
                    err: err.message
                })
            }
            else {
                let prediction = prepareResponse(data.Body);
                setQueryState({ 
                    isLoading: false, 
                    data: prediction, 
                    err: null
                })
            }
        });
    }, []);
    return queryState;
}

function convertToArray(data) {
    var raw = atob(data);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    
    return array;
}

function prepareResponse(responseBuffer) {
    const predictionValues = JSON.parse(responseBuffer.toString());    
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