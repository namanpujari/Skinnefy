import * as React from 'react';

var Buffer = require('buffer').Buffer;

var AWS = require('aws-sdk/dist/aws-sdk-react-native');

// var config  = new AWS.Config();

// AWS.config.getCredentials(function(err) {
//     if(err) console.log(err.stack);
//     else {
//         console.log("Access key:", AWS.config.credentials.accessKeyId);
//         console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
//     }
// })
var sagemakerruntime = new AWS.SageMakerRuntime({accessKeyId: "*", 
    secretAccessKey: "*", region: "us-east-2",});

const endpoint_name = "skin-classification-endpoint--4-1-2020";

export function useEndpoint(image) {
    // image is { uri: ''', base64: ''', }
    // read in the image using javascript filesystem
    const [queryState, setQueryState] = React.useState({ isLoading: true, data: null, err: null });

    React.useEffect(() => {
        sagemakerruntime.invokeEndpoint({
            Body: image.base64,
            EndpointName: endpoint_name,
            ContentType: "application/x-image", 
        }, function(err, data) {
            if(err) {
                console.log("ERROR: " + err.message);
                setQueryState({ isLoading: false, data: null, err: err.message})
            }
            else {
                console.log(data);
                setQueryState({ isLoading: false, data: data, err: null})
            }
        });
    }, []);
    return queryState;
}

// export const useFirestoreDoc = (collectionName, docName) => {
//     const [docState, setDocState] = React.useState({ isLoading: true, data: null });
//     React.useEffect(() => {
//         return db.collection(collectionName)
//         .doc(docName)
//         .onSnapshot(doc => {
//         setDocState({ isLoading: false, data: doc.data() });
//         });
//     }, []);
//     return docState;
// }



