// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPQTXpS4TUcqjnNuRhsG4nWIj_kjLzWg0",
  authDomain: "elevateme-2cd6a.firebaseapp.com",
  projectId: "elevateme-2cd6a",
  storageBucket: "elevateme-2cd6a.appspot.com",
  messagingSenderId: "297345841600",
  appId: "1:297345841600:web:cf75f9c3afc4ebd5477025",
  measurementId: "G-GKRRKSGJ5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
