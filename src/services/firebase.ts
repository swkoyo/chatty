/* eslint-disable no-console */
import { getAnalytics } from 'firebase/analytics';
import { FirebaseError, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../types/auth';
import { IMessage } from '../types/messages';

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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

export const sendMessage = async (roomId: string, user: IUser, text: string) => {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp()
        });
    } catch (err) {
        console.error(err);
    }
};

export const getMessages = (roomId: string, callback: Dispatch<SetStateAction<IMessage[]>>) => {
    return onSnapshot(
        query(collection(db, 'chat-rooms', roomId, 'messages'), orderBy('timestamp', 'asc')),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data()
                    } as IMessage)
            );
            callback(messages);
        }
    );
};
