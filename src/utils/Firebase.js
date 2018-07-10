import firebase from 'firebase';

import Config from './Config';

const config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDOR_ID
};

firebase.initializeApp(config);

// firebase storage
export function getAssetImageUrl(path) {
  const encodedPath = encodeURIComponent(path.replace(/^\//, ''));

  return `https://firebasestorage.googleapis.com/v0/b/${
    Config.FIREBASE_STORAGE_BUCKET
  }/o/${encodedPath}?alt=media`;
}
