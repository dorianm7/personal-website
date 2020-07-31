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
    signInSuccessUrl: '../blogedit.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '../index.html', //no TOS url
    privacyPolicyUrl: '../index.html' //no Privacy policy url
};

//Move user from Login to Blog-Edit page if signed in and vice-versa 
auth.onAuthStateChanged(function(user) {
    if(window.location.href.includes('login.html')) {
        if(user) {
            window.location.href = '../blogedit.html';
        }
        else {
            let ui = new firebaseui.auth.AuthUI(auth);
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    }

    if(window.location.href.includes('blogedit.html')) {
        if(!user) {
            alert('Access denied');
            window.location.href = '../login.html';
        }
        else{
            document.querySelector('body').style.display = '';
        }
    }
});