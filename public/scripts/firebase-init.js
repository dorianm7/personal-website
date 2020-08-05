var firebaseConfig = {
    apiKey: "AIzaSyAXMIHD0aUJKyIWd8GHgB30MvE68AigvZQ",
    authDomain: "dorian-alexis-maldonado.firebaseapp.com",
    databaseURL: "https://dorian-alexis-maldonado.firebaseio.com",
    projectId: "dorian-alexis-maldonado",
    storageBucket: "dorian-alexis-maldonado.appspot.com",
    messagingSenderId: "436846424535",
    appId: "1:436846424535:web:df3d4d0cf8cb7d7a379b92"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export {auth};