var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCNm4MidLf6UF4BiTd2pZGVlYSAWKkrlOg",
    authDomain: "skinnefy-2b361.firebaseapp.com",
    databaseURL: "https://skinnefy-2b361.firebaseio.com",
    projectId: "skinnefy-2b361",
    storageBucket: "skinnefy-2b361.appspot.com",
    messagingSenderId: "256806392968",
    appId: "1:256806392968:web:cb7362ec24254f45f5bb3d",
    measurementId: "G-PWWME332J8"
};

firebase.initializeApp(firebaseConfig);
export default firebase;