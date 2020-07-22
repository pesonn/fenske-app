import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeMode, AppTheme, UserData } from "../App";
import Button from "./Button";
import firebase from "../firebase";

export default function LogoutButton(props) {
  const thememode = useContext(ThemeMode);
  const user = useContext(UserData);
  return (
    <>
      {user ? (
        <StyledLogoutButton
          className={props.className}
          thememode={thememode}
          onClick={() => firebase.auth().signOut()}
        >
          {props.children}
        </StyledLogoutButton>
      ) : (
        <></>
      )}
    </>
  );
}

const StyledLogoutButton = styled(Button)`
  background-color: ${(props) => props.theme[props.thememode].maincolors.black};
  font-size: ${(props) => props.theme.general.fontSizes.smallButton};
  width: 8vh;
  height: 2.5vh;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9999;
`;
