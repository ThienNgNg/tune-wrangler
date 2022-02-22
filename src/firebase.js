import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRY7_SiPC58lv0Cr_ET67pBHU8UD5O_Kg",
  authDomain: "tune-wrangler.firebaseapp.com",
  projectId: "tune-wrangler",
  storageBucket: "tune-wrangler.appspot.com",
  messagingSenderId: "359210943677",
  appId: "1:359210943677:web:1700c473716dfe747323d4",
  measurementId: "G-DVVHKN9NP8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();