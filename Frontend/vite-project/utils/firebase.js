import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCsdeZL0yso4mDk0bQOIec-R81cmWu3u0g",
  authDomain: "loginonecart-6a03f.firebaseapp.com",
  projectId: "loginonecart-6a03f",
  storageBucket: "loginonecart-6a03f.firebasestorage.app",
  messagingSenderId: "325280531090",
  appId: "1:325280531090:web:cb3ec01f4f8ed77b01dc4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}