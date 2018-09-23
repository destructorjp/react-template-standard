import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

import firebase from '@firebase/app';
import moment from 'moment';
import uuid from 'uuid';

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

// firebase auth
export function getFirebaseIdToken() {
  return firebase.auth().currentUser.getIdToken(true);
}

// email
export function signUpWithEmailAndPassword(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function signInWithEmailAndPassword(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

// sms
firebase.auth().languageCode = navigator.language || navigator.userLanguage;

let confirmationResult = null;

export function signInWithPhoneNumber(phoneNumber) {
  confirmationResult = null;

  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'sign-in-with-phonnenumber',
    {
      size: 'invisible',
      callback: function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }
  );

  return firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
    .then(result => {
      confirmationResult = result;

      return result;
    });
}

export function getPhoneNumberConfirmationResult() {
  return confirmationResult;
}

export function signOut() {
  return firebase.auth().signOut();
}

// firestore
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true }); // https://github.com/firebase/firebase-js-sdk/issues/726#issuecomment-385163921

export function getDb() {
  return db;
}

export function getCollection(collection) {
  return db.collection(collection);
}

export function getTimestamp() {
  return moment().toISOString();
}

// firebase storage
const storage = firebase.storage().ref();

export function getAssetImageUrl(path) {
  const encodedPath = encodeURIComponent(path.replace(/^\//, ''));

  return `https://firebasestorage.googleapis.com/v0/b/${
    Config.FIREBASE_STORAGE_BUCKET
  }/o/${encodedPath}?alt=media`;
}

export function uploadImage(path, image) {
  return new Promise((resolve, reject) => {
    if (!image.file) {
      return resolve(image.uri);
    }

    const fileName = uuid.v4();

    const rootPath = path.replace(/^\//, '');

    const filePath = `${rootPath}/${fileName}`;

    const uploader = storage.child(filePath);

    return uploader
      .put(image.file)
      .then(() => resolve(getAssetImageUrl(filePath)))
      .catch(error => reject(error));
  });
}

export function uploadImages(path, images) {
  return Promise.all(
    images.map(async image => {
      if (!image.file) {
        return image.uri;
      }

      const fileName = uuid.v4();

      const rootPath = path.replace(/^\//, '');

      const filePath = `${rootPath}/${fileName}`;

      const uploader = storage.child(filePath);

      return uploader.put(image.file).then(() => getAssetImageUrl(filePath));
    })
  );
}

export function uploadFiles(path, files) {
  return Promise.all(
    files.map(file => {
      const fileName = uuid.v4();

      const rootPath = path.replace(/^\//, '');

      const filePath = `${rootPath}/${fileName}`;

      const uploader = storage.child(filePath);

      return uploader.put(file).then(() => getAssetImageUrl(filePath));
    })
  );
}

export default firebase;
