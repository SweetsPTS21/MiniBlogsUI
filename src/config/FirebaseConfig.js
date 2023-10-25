// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxjfaPMkxT_omiFTVjfm-WDNPhmQauKTQ",
    authDomain: "miniblogs-1fb1e.firebaseapp.com",
    projectId: "miniblogs-1fb1e",
    storageBucket: "miniblogs-1fb1e.appspot.com",
    messagingSenderId: "899573911492",
    appId: "1:899573911492:web:613e81d57bf97161835e91",
    measurementId: "G-DLZPB5XZJ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
