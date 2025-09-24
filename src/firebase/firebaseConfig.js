// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNLPAgkFR0hlE580aDFZV5fZZanQiL4eI",
  authDomain: "pinklady-582d8.firebaseapp.com",
  projectId: "pinklady-582d8",
  storageBucket: "pinklady-582d8.firebasestorage.app",
  messagingSenderId: "89407412543",
  appId: "1:89407412543:web:b7023229fbfd917b9e5b8a",
  measurementId: "G-ECPK0GB6SN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };