import React, { useState, useEffect, useContext } from "react";
import firebase, { getFirebaseCollectionFrom } from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AppTitle from "../components/AppTitle";
import Button from "../components/Button";
import { UserData } from "../App";

export default function Admin(props) {
  return (
    <>
      <AppTitle
        appdetails={{
          name: "Hello Admin",
          description:
            "Dieser Bereich wird zum Testen während der Entwicklung verwendet.",
        }}></AppTitle>
    </>
  );
}
