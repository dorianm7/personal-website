import {auth} from './firebase-init.js';

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            //Successfully signed in
            //return type redirect automatically or you handle
            return false;
        },
        uiShown: function() {
            //Widget is rendered. Hide the loader
            document.getElementById('loader').style.display = 'none';
        }
    },
    //Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/public/blogedit.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '/public/index.html', //no TOS url
    privacyPolicyUrl: '/public/index.html' //no Privacy policy url
};

//Move user from Login to Blog-Edit page if signed in and vice-versa 
auth.onAuthStateChanged(function(user) {
    if(window.location.href.includes('login.html')) {
        if(user) {
            window.location.href = '/public/blogedit.html';
        }
        else {
            let ui = new firebaseui.auth.AuthUI(auth);
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    }

    if(window.location.href.includes('blogedit.html')) {
        if(!user) {
            alert('Access denied');
            window.location.href = '/public/login.html';
        }
        else{
            //body of 'blogedit.html' is hidden by default. Unhide if authorized
            //User could unhide through CSS and disable Javascript to prevent redirect,
            // but none of the information is sensitive. Possible to make body a template and
            // insert it when the user is authorized to prevent from any information leaking
            document.querySelector('body').style.display = '';
        }
    }
});