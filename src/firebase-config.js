// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "linkedin-clone-with-qazi.firebaseapp.com",
  projectId: "linkedin-clone-with-qazi",
  storageBucket: "linkedin-clone-with-qazi.appspot.com",
  messagingSenderId: "345016061277",
  appId: "1:345016061277:web:6ed63be79ad905eb242cb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const collectionRef = collection(db, "Article");

