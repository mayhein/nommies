import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  console.log('Connected to Firebase')
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
