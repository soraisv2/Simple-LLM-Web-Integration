// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyBSRKNJhlcDTrbd4sIVvfgqODkgRbjIRyc",
    authDomain: "llm-web-69b85.firebaseapp.com",
    databaseURL: "https://llm-web-69b85-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "llm-web-69b85",
    storageBucket: "llm-web-69b85.appspot.com",
    messagingSenderId: "886786775690",
    appId: "1:886786775690:web:f3697ce732c7968248eb73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
