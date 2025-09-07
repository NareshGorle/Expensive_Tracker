import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0vZRTCMpOHIL0-VjpyZ72k85DqDjmDbE",
  authDomain: "expensive-tracker-f373b.firebaseapp.com",
  projectId: "expensive-tracker-f373b",
  storageBucket: "expensive-tracker-f373b.firebasestorage.app",
  messagingSenderId: "851815541673",
  appId: "1:851815541673:web:3f9d403026680a59bfb2b8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
}