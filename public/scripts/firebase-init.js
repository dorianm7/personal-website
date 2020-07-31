var firebaseConfig = {
    apiKey: "AIzaSyBMY9iaR4u74g6x0i_XeoFbEJfUDLpManM",
    authDomain: "cse134b-hw5-f0af8.firebaseapp.com",
    databaseURL: "https://cse134b-hw5-f0af8.firebaseio.com",
    projectId: "cse134b-hw5-f0af8",
    storageBucket: "cse134b-hw5-f0af8.appspot.com",
    messagingSenderId: "337467895487",
    appId: "1:337467895487:web:276909736d9eef43aea00a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export {auth};