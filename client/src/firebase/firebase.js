// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAXSkwbTutEuSHE1YIszd74DX-iFLT_dTc",
    authDomain: "fund-raiser-93776.firebaseapp.com",
    projectId: "fund-raiser-93776",
    storageBucket: "fund-raiser-93776.firebasestorage.app",
    messagingSenderId: "313669967884",
    appId: "1:313669967884:web:65c72c30fcbdc51327ce29"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication module
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
