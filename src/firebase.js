import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBvpl5x9ul8pGUfbZNqNeKQPg1QGzsW8eI",
  authDomain: "react-crud-fbase.firebaseapp.com",
  projectId: "react-crud-fbase",
  storageBucket: "react-crud-fbase.appspot.com",
  messagingSenderId: "356786250960",
  appId: "1:356786250960:web:d558eaf6bc645e9894ead5"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();