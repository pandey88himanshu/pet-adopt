// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adop.firebaseapp.com",
  projectId: "pet-adop",
  storageBucket: "pet-adop.firebasestorage.app",
  messagingSenderId: "381764561542",
  appId: "1:381764561542:web:a4a58c842e185aeeb17f07",
  measurementId: "G-54RH575ZB3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const storage = getStorage(app);
// const analytics = getAnalytics(app);
