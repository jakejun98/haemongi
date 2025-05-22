// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAAELdvC9Mz7ZmUd1ZloAvmI-HOM7df1s",
    authDomain: "haemongi-80e60.firebaseapp.com",
    projectId: "haemongi-80e60",
    storageBucket: "haemongi-80e60.firebasestorage.app",
    messagingSenderId: "1064958221112",
    appId: "1:1064958221112:web:a6468168a2f414ff17ffcd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
