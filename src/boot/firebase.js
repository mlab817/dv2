import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6ycSXQXdlEaJFO97mF7s_UoXDMujIwgQ",
  authDomain: "dragon-village2.firebaseapp.com",
  projectId: "dragon-village2",
  storageBucket: "dragon-village2.appspot.com",
  messagingSenderId: "58436857566",
  appId: "1:58436857566:web:e93cb7ae13ff8627699c4f",
  measurementId: "G-TD8FMWPEQN"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebaseApp.auth()
const firebaseFs = firebaseApp.firestore()

export {
  firebaseAuth,
  firebaseFs,
  firebaseApp
}
