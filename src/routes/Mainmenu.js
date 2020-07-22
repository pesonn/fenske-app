import React, { useContext } from "react";
import firebase from "../firebase";
import styled from "styled-components";
import Button from "../components/Button";
import AppTitle from "../components/AppTitle";
import { ThemeMode, AppTheme } from "../App";
import { Redirect } from "react-router-dom";

export default function Mainmenu(props) {
  const user = firebase.auth().currentUser;

  const thememode = useContext(ThemeMode);
  return (
    <MenuWrapper>
      <StyledAppTitle
        thememode={thememode}
        appdetails={{
          name: "Fenske.app",
          description: "Was möchtest du machen?",
        }}
      ></StyledAppTitle>
      <AppTheme.Provider value="putzt">
        <a href="/putzt">
          <MenuButton thememode={thememode} user={user}>
            Putzt
          </MenuButton>
        </a>
      </AppTheme.Provider>
      <AppTheme.Provider value="glotzt">
        <a href="/glotzt">
          <MenuButton thememode={thememode}>Glotzt</MenuButton>
        </a>
      </AppTheme.Provider>
    </MenuWrapper>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 5vh;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  height: 65vh;
  width: 80vw;
  margin-left: 10vw;
  padding: 5vh 0 0 0;
  min-height: 350px;
`;

const MenuButton = styled(Button)`
  width: 45vh;
  height: 10vh;
  font-size: 2.8vh;
`;
