// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcgAr_JH6uokic-IxMQ5ZEfLttGfwvU1I",
    authDomain: "swagfit-165cd.firebaseapp.com",
    projectId: "swagfit-165cd",
    storageBucket: "swagfit-165cd.appspot.com",
    messagingSenderId: "789000491329",
    appId: "1:789000491329:web:fc77a0763f91f532ca91c0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
auth.useDeviceLanguage();
