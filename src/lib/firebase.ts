import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHNiV1lL2oxlNmGKEfJ7qDy7CHshVlM7M",
  authDomain: "idas-kitchen.firebaseapp.com",
  databaseURL: "https://idas-kitchen-default-rtdb.firebaseio.com",
  projectId: "idas-kitchen",
  storageBucket: "idas-kitchen.firebasestorage.app",
  messagingSenderId: "177143028894",
  appId: "1:177143028894:web:4823742d52d4cb5d5d6f8f",

};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Export the app so it can be used in AdminDashboard.tsx
export { app, db, auth };

