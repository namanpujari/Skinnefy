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

var sagemakerruntime = new AWS.SageMakerRuntime({accessKeyId: "AKIAIRFDWRRZECSBYY4A", 
    secretAccessKey: "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", region: "us-east-2",});

const endpoint_name = "skin-classification-endpoint--4-1-2020";

export function useEndpoint(image) {
    const [queryState, setQueryState] = React.useState({ isLoading: true, data: null, err: null });
    const params = {
        Body: image, // THIS IMAGE IS CURRENTLY JUST A STRING URI OF WHERE THE IMAGE IS LOCALLY STORED
        // WE WANT TO CONVERT THIS INTO A BYTEARRAY AND SEND IT
        EndpointName: endpoint_name,
        ContentType: "application/x-image",
    };
    React.useEffect(() => {
        sagemakerruntime.invokeEndpoint(params, function(err, data) {
            if(err) {
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



