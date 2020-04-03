import firebase from "./firebase";

//liegt direkt in der firebase.js
export const getFirebaseCollection = (collectionname) =>
  firebase.firestore().collection(collectionname); //as string
