// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIce5MFZ2uRip7pVrZ6AiD8qoaN0lUWN4",
  authDomain: "myaiapp-8f339.firebaseapp.com",
  projectId: "myaiapp-8f339",
  storageBucket: "myaiapp-8f339.firebasestorage.app",
  messagingSenderId: "478426083764",
  appId: "1:478426083764:web:8382f4e94d808e658082e1",
  measurementId: "G-RMRR6HHXDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);