import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "twitter-clone-2d0ca.firebaseapp.com",
  projectId: "twitter-clone-2d0ca",
  storageBucket: "twitter-clone-2d0ca.appspot.com",
  messagingSenderId: "352696783843",
  appId: import.meta.env.VITE_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
