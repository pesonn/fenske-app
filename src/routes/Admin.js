import React, { useState, useEffect, useContext } from "react";
import firebase, { getFirebaseCollectionFrom } from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AppTitle from "../components/AppTitle";
import Button from "../components/Button";
import { UserData } from "../App";

export default function Admin(props) {
  firebase.auth().languageCode = "de";
  const user = useContext(UserData);
  let dbcode;
  const createPutztgruppe = () => {
    const newDoc = getFirebaseCollectionFrom("putzt-app").doc();

    newDoc.set({
      weeknumber: 0,
      lastupdate: null,
      rooms: {
        bathrooms: ["Bad 1", "Bad 2"],
        otherrooms: ["Müll", "Küche", "Wohnen"],
      },
    });
    newDoc.update({
      invitecode: newDoc.id.substr(0, 6),
    });
    newDoc.collection("putzplan").doc(user.userid).set({ test: "hallo" });

    getFirebaseCollectionFrom("users")
      .doc(user.userid)
      .update({ putztID: newDoc.id });
  };

  return (
    <>
      <AppTitle
        appdetails={{ name: "Hello Admin", description: "" }}
      ></AppTitle>
      <Button onClick={createPutztgruppe}>starte den Test</Button>
    </>
  );
}
