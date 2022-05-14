// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvkbUmaCNp8Ry5VMY1bcHdgiWxq2Ju54s",
  authDomain: "item-9f6eb.firebaseapp.com",
  projectId: "item-9f6eb",
  storageBucket: "item-9f6eb.appspot.com",
  messagingSenderId: "628283751467",
  appId: "1:628283751467:web:eddb75d6364c169fd8be6e",
  measurementId: "G-P9B2ZWJ8CG"
};
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;