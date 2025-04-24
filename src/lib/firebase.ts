import { initializeApp, getApps, getApp } from "firebase/app";

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

export { firebaseApp as app };

