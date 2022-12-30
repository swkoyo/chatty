/* eslint-disable no-console */
import { FirebaseError, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VITE_FIREBASE_DB_URL,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const { user } = await signInWithPopup(auth, provider);
        return { uid: user.uid, displayName: user.displayName };
    } catch (err) {
        if (err instanceof FirebaseError && err.code !== 'auth/cancelled-popup/request') {
            console.error(err);
        }
        return null;
    }
};

export default db;
