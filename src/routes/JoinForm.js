import React from "react";
import styled from "styled-components";
import AppTitle from "../components/AppTitle";
import InputField from "../components/InputField";

export default function JoinForm(props) {
  return (
    <MenuWrapper>
      {props.app === "putzt" && (
        <AppTitle
          appdetails={{
            name: "Fenske putzt!",
            description:
              "Anscheinend bist du in keiner Putzgruppe. Gib hier den Invitecode deiner Freunde ein, um beim Putzen mitzumachen.",
          }}
        />
      )}
      {props.app === "glotzt" && (
        <AppTitle
          appdetails={{
            name: "Fenske glotzt!",
            description: "Gib den Code zum laufenden Spiel ein",
          }}
        />
      )}
      <InputField />
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
