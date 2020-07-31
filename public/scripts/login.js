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

firebase.auth();

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            //Successfully signed in
            //return type determines whether we continue the redirect automatically
            // or whether we leave that developer to handle
            return true;
        },
        uiShown: function() {
            //Widget is rendered. Hide the loader
            document.getElementById('loader').style.display = 'none';
        }
    },
    //Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../blogedit.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '../index.html', //no TOS url
    privacyPolicyUrl: '../index.html' //no Privacy policy url
};

ui.start('#firebaseui-auth-container', uiConfig);