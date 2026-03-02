import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyATMnG-5xYhijr0xtGQZT6wT5NSrn7hpQY",
  authDomain: "gymbook-323da.firebaseapp.com",
  projectId: "gymbook-323da",
  storageBucket: "gymbook-323da.firebasestorage.app",
  messagingSenderId: "60745313263",
  appId: "1:60745313263:web:00eb808fc9bd6333ea241a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);