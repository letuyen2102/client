import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = { 
    apiKey : "AIzaSyBbLgHgOpXJeckQnpxRg0g4uxHCHJR9khs" , 
    authDomain : "auth-ff3d6.firebaseapp.com" , 
    projectId : "auth-ff3d6" , 
    storageBucket : "auth-ff3d6.appspot.com" , 
    messagingSenderId : "955357172472" , 
    appId : "1:955357172472:web:43288d1bec7accf4b5a10d" , 
    measurementId : "G-K0FRV0DD3W" 
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new FacebookAuthProvider();

export {auth, provider}