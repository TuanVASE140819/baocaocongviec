// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCiSFmShFexDCsBWq2PGqRzwb9JOoOiEzM',
  authDomain: 'reportworkbluepink.firebaseapp.com',
  projectId: 'reportworkbluepink',
  storageBucket: 'reportworkbluepink.appspot.com',
  messagingSenderId: '901507431250',
  appId: '1:901507431250:web:b2f2d1886efbf8511e988b',
  measurementId: 'G-X97029SVDQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
export const db =getFirestore(app);
export default app;