import firebase from 'firebase/app'

import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyBX2bp-QPOkjU8HZGhssfSiZgdrvUQuCAw",
  authDomain: "trainerappbcn-703d2.firebaseapp.com",
  projectId: "trainerappbcn-703d2",
  storageBucket: "trainerappbcn-703d2.appspot.com",
  messagingSenderId: "997099025651",
  appId: "1:997099025651:web:56a5faa8971399b04df386",
  measurementId: "G-WH408R799H"
};
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();


  export {app,googleAuthProvider,facebookAuthProvider}