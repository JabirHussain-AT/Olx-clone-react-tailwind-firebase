import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB25QeOmO1EZRs1HalzZDn_N5mqVr004X8" ,
  authDomain: "olx-clone-34446.firebaseapp.com",
  projectId: "olx-clone-34446",
  storageBucket: "olx-clone-34446.appspot.com",
  messagingSenderId: "1077202320423",
  appId: "1:1077202320423:web:99034bee254bc94e356202",
  measurementId: "G-JSVLNZXL2T"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider()