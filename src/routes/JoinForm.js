import React from "react";
import firebase from "../firebase";
import functions from "firebase/functions";
import styled from "styled-components";
import AppTitle from "../components/AppTitle";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function JoinForm(props) {
  const cloudfunction = firebase
    .app()
    .functions("europe-west3")
    .httpsCallable("createPutzgroup");
  const createNewPutzgroup = () => {
    cloudfunction();
  };
  return (
    <MenuWrapper>
      {props.app === "putzt" && (
        <>
          <AppTitle
            appdetails={{
              name: "Fenske putzt!",
              description:
                "Anscheinend bist du bisher in keiner Putzgruppe. Gib hier den Invitecode deiner Freunde ein, um beim Putzen mitzumachen.",
            }}
          />
          <AppTitle
            appdetails={{
              name: "",
              description:
                "Gib hier den Invitecode deiner Freunde ein, um beim Putzen mitzumachen.",
            }}
          />
          <InputField cloudFunction={"setPutztIDForUser"} />
          <AppTitle
            appdetails={{
              name: "",
              description:
                "Oder eröffne eine neue Putzgruppe für dich und deine WG.",
            }}
          />
          <StyledButton
            type={"button"}
            className={props.className}
            onClick={createNewPutzgroup}
          >
            Putzgruppe erstellen
          </StyledButton>
        </>
      )}
      {props.app === "glotzt" && (
        <>
          <AppTitle
            appdetails={{
              name: "Fenske glotzt!",
              description:
                "Eröffne ein neues Spiel oder gib den Code zum laufenden Spiel ein!",
            }}
          />
          <StyledButton type={"button"} className={props.className}>
            Spiel aufmachen
          </StyledButton>
          <InputField />
        </>
      )}
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
  margin-left: 10vw;
  padding: 0vh 0 0 0;
  min-height: 350px;
`;

const StyledButton = styled(Button)``;
