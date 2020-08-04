import {auth} from './firebase-init.js';
import {database} from './firebase-db.js';

auth.onAuthStateChanged(function(user) {
    //placeholder
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