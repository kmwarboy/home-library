import { initializeApp } from "firebase/app";
import configData from "./firebaseConfig.json";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// web apps firebase config (homeLibrary)
const firebaseConfig = configData;

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize fb auth and get a ref to the seervice
export const auth = getAuth(app);
export const db = getFirestore(app);
