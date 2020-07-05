import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const getFirebaseCollectionFrom = (collectionname) =>
  firebase.firestore().collection(collectionname); //as string

/* Firestore Security Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	
    match /users/{userID}  {
    allow read: if request.auth != null && request.auth.uid == userID
    }
    
    match /putzt-app/{putztID} {
    allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.putztID == resource.id;
    }
    
    match /putzt-app/{putztID}/{documentID}/{subcollection=**} {
    allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.groupID == get(/databases/$(database)/documents/putzt-app/$(putztID)).data.groupID;
    
    }
  }
} */
