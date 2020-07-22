import React, { useContext, useState } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";
import { ThemeMode, AppTheme, UserData } from "../App";
import OverlayField from "./OverlayField";
import AppTitle from "./AppTitle";
import Button from "./Button";

export default function FirstSignInOverlay(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  const user = useContext(UserData);

  const handleFirstSignIn = () => {
    getFirebaseCollectionFrom("users")
      .doc(user.userid)
      .update({ hasSignedInOnce: true });
  };

  return (
    <OverlayField className={props.className}>
      <StyledAppTitle
        appdetails={{
          name: "Danke",
          description: "Hey! Vielen Dank, dass du dich angemeldet hast!",
        }}
      />
      <Description thememode={thememode} apptheme={apptheme}>
        Leider läuft in der Anmeldung etwas noch nicht ganz rund.
      </Description>
      <Description thememode={thememode} apptheme={apptheme}>
        Bitte gib gleich nochmal deinen Vornamen an, damit deine Freunde auch
        wissen mit wem sie spielen.
      </Description>
      <Description thememode={thememode} apptheme={apptheme}>
        Dann schnell neu einloggen und schon kann's los gehen!
      </Description>
      <StyledButton onClick={handleFirstSignIn}>
        Klar! Gar kein Problem!
      </StyledButton>
    </OverlayField>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 3vh;
`;

const Description = styled.h2`
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  margin-top: 10px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 15%;
`;
