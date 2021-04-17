import firebase from "firebase/app;"
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZSMopHy80jczFnydpyHs6nVk6FEE2TKU",
  authDomain: "cs5610-d40ea.firebaseapp.com",
  projectId: "cs5610-d40ea",
  storageBucket: "cs5610-d40ea.appspot.com",
  messagingSenderId: "113923463244",
  appId: "1:113923463244:web:651c118a878cd0b0b97ce9",
}

firebase.initializeApp(firebaseConfig);
export default firebase;