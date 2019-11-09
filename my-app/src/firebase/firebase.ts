import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyD7lnKHVeBy27MyfwlmclZQa-9ZNn1nCj4',
    authDomain: 'testcase-fd1e6.firebaseapp.com',
    databaseURL: 'https://testcase-fd1e6.firebaseio.com/',
    projectId: 'testcase-fd1e6',
    storageBucket: '',
    messagingSenderId: '561912624627',
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};