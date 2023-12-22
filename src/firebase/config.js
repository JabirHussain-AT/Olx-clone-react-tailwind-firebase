import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD8RbPRRrZdMeHnsb55QpXBh9ZeWIvFi70",
    authDomain: "olxclone-react.firebaseapp.com",
    projectId: "olxclone-react",
    storageBucket: "olxclone-react.appspot.com",
    messagingSenderId: "342839646936",
    appId: "1:342839646936:web:be47dd07a48bebeb1455ad",
    measurementId: "G-HFTMR3NV7N"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider()