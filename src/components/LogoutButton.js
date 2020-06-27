import React from "react";
import styled from "styled-components";
import { ThemeMode, AppTheme } from "../App";
import Button from "./Button";
import firebase from "../firebase"

export default function LogoutButton(props) {
  const thememode = useContext(ThemeMode);
  return (
  <> 
    { user ? 
    (<StyledLogoutButton
      className={props.className}
      thememode={thememode}
      onClick={props.onClick}
    />)
    :
    (<></>)}
  </>
}

const StyledLogoutButton = styled(Button)`
  background-color: ${(props) => props.theme[props.thememode].maincolors.black};
`;
