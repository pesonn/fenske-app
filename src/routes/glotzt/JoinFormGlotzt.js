import React, { useContext } from "react";
import firebase from "../../firebase";
import functions from "firebase/functions";
import styled from "styled-components";
import AppTitle from "../../components/AppTitle";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { UserData } from "../../App";

export default function JoinFormGlotzt(props) {
  const user = useContext(UserData);
  const cloudfunction = firebase
    .app()
    .functions("europe-west3")
    .httpsCallable("create---");
  const createNew = () => {
    cloudfunction({ name: user.name });
  };
  return (
    <MenuWrapper>
      {/* TODO: Funktionen von JoinFormPutzt übernehmen! */}
      <AppTitle
        appdetails={{
          name: "Rausvoten!",
          description:
            "Eröffne ein neues Spiel oder gib den Code zum laufenden Spiel ein!",
        }}
      />
      <AppTitle
        appdetails={{
          name: "",
          description:
            "Gib hier den Invitecode um einem Spiel beizutreten",
        }}
      />
      <InputField cloudFunction={""} />
      <AppTitle
        appdetails={{
          name: "",
          description:
            "Oder eröffne eine neue Runde Rausvoten für dich und deine Freunde.",
        }}
      />
      <StyledButton
        type={"button"}
        className={props.className}
        onClick={""}
      >
        neues Spiel erstellen
       </StyledButton>
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
