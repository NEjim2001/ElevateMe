import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
