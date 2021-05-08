import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBw_hZtwd9J3Ublakh1XN9Gafx_qV6RpYg",
  authDomain: "fb-autho-868b3.firebaseapp.com",
  projectId: "fb-autho-868b3",
  storageBucket: "fb-autho-868b3.appspot.com",
  messagingSenderId: "643299201198",
  appId: "1:643299201198:web:86e768e000fdc9418cdd3f",
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();