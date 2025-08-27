// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCQRdCpLlfIxGJg9M2Q_KJnBqK1iKsEF2A",
  authDomain: "project-for-me-e0921.firebaseapp.com",
  projectId: "project-for-me-e0921",
  storageBucket: "project-for-me-e0921.firebasestorage.app",
  messagingSenderId: "520547953159",
  appId: "1:520547953159:web:5cb84df3dc9487f65e18a2",
  measurementId: "G-Y46X9C3E5H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

