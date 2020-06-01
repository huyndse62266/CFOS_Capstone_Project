import firebase from 'firebase/app';
import 'firebase/storage';
const config = {
  apiKey: 'AIzaSyAjoVn1rgEnFcGBbuQ74IS7pLKgOW74A0k',
  authDomain: 'cfos-captone.firebaseapp.com',
  databaseURL: 'https://cfos-captone.firebaseio.com',
  projectId: 'cfos-captone',
  storageBucket: 'cfos-captone.appspot.com',
  messagingSenderId: '656535127522',
  appId: '1:656535127522:web:60d6320894e2983c'
};
firebase.initializeApp(config);
const storage = firebase.storage();
export { storage, firebase as default };
