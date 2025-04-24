import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Removed incorrect import of 'app'


const firebaseConfig = {
  apiKey: "AIzaSyBHNiV1lL2oxlNmGKEfJ7qDy7CHshVlM7M",
  authDomain: "idas-kitchen.firebaseapp.com",
  databaseURL: "https://idas-kitchen-default-rtdb.firebaseio.com",
  projectId: "idas-kitchen",
  storageBucket: "idas-kitchen.firebasestorage.app",
  messagingSenderId: "177143028894",
  appId: "1:177143028894:web:4823742d52d4cb5d5d6f8f",
  measurementId: "G-60LM33KNJC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

