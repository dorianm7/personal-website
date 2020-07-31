import {auth} from './firebase-init.js';

auth.onAuthStateChanged(function(user) {
    console.log('user' + user);
});

const attachSignOutBtn = () => {
    const signOutBtn = document.getElementById('sign-out');
    signOutBtn.addEventListener('click', () => {
        auth.signOut()
            .then(window.location.href = '../login.html')
            .catch((e) => console.log(e));
    });
};

window.addEventListener('DOMContentLoaded', () => {
    attachSignOutBtn();
});