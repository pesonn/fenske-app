import React from "react";
import firebase from "../firebase";
import * as firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function FirebaseAuthFields() {
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/checklogin",
    signInOptions: [
      {
        provider: "apple.com",
        customParameters: {
          locale: "de",
        },
        requireDisplayName: true,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: ["https://www.googleapis.com/auth/plus.login"],
        requireDisplayName: true,
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // display Name wird zu spät übergeben Name muss irgendwie händisch eingegeben werden.
        requireDisplayName: false,
      },
    ],
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}
