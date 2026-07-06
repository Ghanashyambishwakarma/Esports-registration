import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
// Get these from Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
  apiKey: "AIzaSyBlkb4gilZeyF1M-IpbKdWWlj9ft3IwHKs",
  authDomain: "portfolio-18ed7.firebaseapp.com",
  projectId: "portfolio-18ed7",
  storageBucket: "portfolio-18ed7.firebasestorage.app",
  messagingSenderId: "872610638920",
  appId: "1:872610638920:web:497d22e1c0a63a83df7c7d",
  measurementId: "G-FD39JJ7VVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
