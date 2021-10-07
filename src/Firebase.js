import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDKmrdAC8uQr5HwPYuCEYNWU-kd8UwF1zw",
    authDomain: "projetobsi-faa62.firebaseapp.com",
    databaseURL: "https://projetobsi-faa62-default-rtdb.firebaseio.com",
    projectId: "projetobsi-faa62",
    storageBucket: "projetobsi-faa62.appspot.com",
    messagingSenderId: "201156948765",
    appId: "1:201156948765:web:216895ace1d93e47a467f4",
    measurementId: "G-KHW4B64TD2"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;


