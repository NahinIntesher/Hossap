// Import the functions you need from the SDKs you need
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvxVg7jarEgwwmakVnapr2rXqQTKK7wok",
  authDomain: "chatapp-50c64.firebaseapp.com",
  projectId: "chatapp-50c64",
  storageBucket: "chatapp-50c64.firebasestorage.app",
  messagingSenderId: "1049274355422",
  appId: "1:1049274355422:web:73a75348c6279be87fbc4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
