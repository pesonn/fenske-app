import React from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import AppTitle from "../components/AppTitle";
import FirebaseAuthFields from "../components/FirebaseAuthFields";

export default function Welcome() {
  let user = firebase.auth().currentUser;
  console.log(user);
  return (
    <MenuWrapper>
      <AppTitle
        appdetails={{
          name: "Moin!",
          description: "Melde dich an, um die Fenske App zu benutzen!",
        }}
      />
      <FirebaseAuthFields />
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  height: 65vh;
  width: 80vw;
  padding: 0vh 0 0 0;
  min-height: 350px;
`;
