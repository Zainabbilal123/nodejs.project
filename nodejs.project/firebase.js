// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdvr0j1EsN7N5HrCvkSNq8icQHXJgjz-8",
  authDomain: "nodejs-project-38dd4.firebaseapp.com",
  projectId: "nodejs-project-38dd4",
  storageBucket: "nodejs-project-38dd4.appspot.com",
  messagingSenderId: "18708285499",
  appId: "1:18708285499:web:c574d47e3e5fa66b2df41e",
  measurementId: "G-QF1XZ1V834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export{firestore}