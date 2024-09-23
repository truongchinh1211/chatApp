// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBVr52lm4LjqluXCKZARqE7BLCyHZg1iI",
  authDomain: "chat-app-a7744.firebaseapp.com",
  projectId: "chat-app-a7744",
  storageBucket: "chat-app-a7744.appspot.com",
  messagingSenderId: "821210548840",
  appId: "1:821210548840:web:686511204de1d544cdc9dd",
  measurementId: "G-3PM3HX98ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}