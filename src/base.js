import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyB63Tv78BGvNIsdccQHkPZv9T6n5ZPq__8",
    authDomain: "testerbkb.firebaseapp.com",
    databaseURL: "https://testerbkb.firebaseio.com",
    storageBucket: "testerbkb.appspot.com",
    messagingSenderId: "464556173301"
  };
firebase.initializeApp(config);

export default firebase
