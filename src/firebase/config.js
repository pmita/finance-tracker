import firebase from 'firebase/app';
// SERVICES
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDpMRG1HTRfpNB_dWQlMTL_t6k1zoEL-U4",
    authDomain: "mymonay-2860c.firebaseapp.com",
    projectId: "mymonay-2860c",
    storageBucket: "mymonay-2860c.appspot.com",
    messagingSenderId: "155262775673",
    appId: "1:155262775673:web:496ab89a5481859af9bfa8"
  };

  //Init firebase
  firebase.initializeApp(firebaseConfig);

  //Init services
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();

  export { projectFirestore, projectAuth };