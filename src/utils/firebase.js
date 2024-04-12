
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shoppy-9032c.firebaseapp.com",
  projectId: "shoppy-9032c",
  storageBucket: "shoppy-9032c.appspot.com",
  messagingSenderId: "610380318171",
  appId: "1:610380318171:web:79551eb5847a5a32b753fe",
  measurementId: "G-RYJ3HBWPG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();