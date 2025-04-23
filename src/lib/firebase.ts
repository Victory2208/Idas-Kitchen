import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHNiV1lL2oxlNmGKEfJ7qDy7CHshVlM7M",
  authDomain: "idas-kitchen.firebaseapp.com",
  projectId: "idas-kitchen",
  storageBucket: "idas-kitchen.appspot.com",
  messagingSenderId: "177143028894",
  appId: "1:177143028894:web:4823742d52d4cb5d5d6f8f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
