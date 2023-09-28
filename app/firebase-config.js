import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwCQeTsZ6ovI8kIhIaxESvQzEhBZNBD6E",
  authDomain: "stock-app-30140.firebaseapp.com",
  projectId: "stock-app-30140",
  storageBucket: "stock-app-30140.appspot.com",
  messagingSenderId: "867465444786",
  appId: "1:867465444786:web:83006c86bb4abd7788f8ab",
  measurementId: "G-V82J1JH70C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
