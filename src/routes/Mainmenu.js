import React, { useContext } from "react";
import firebase from "../firebase";
import styled from "styled-components";
import Button from "../components/Button";
import AppTitle from "../components/AppTitle";
import { ThemeMode, AppTheme } from "../App";

export default function Mainmenu(props) {
  const thememode = useContext(ThemeMode);
  const user = firebase.auth().currentUser;

  return (
    <MenuWrapper>
      <StyledAppTitle
        thememode={thememode}
        appdetails={{
          name: "Fenske.app",
          description: "Was möchtest du machen?",
        }}></StyledAppTitle>
      <AppTheme.Provider value="putzt">
        <StyledATag href="/putzt">
          <MenuButton thememode={thememode} user={user}>
            Putzt
          </MenuButton>
        </StyledATag>
      </AppTheme.Provider>
      <AppTheme.Provider value="glotzt">
        <StyledATag href="/glotzt">
          <MenuButton thememode={thememode}>Glotzt</MenuButton>
        </StyledATag>
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
  padding: 5vh 0 0 0;
  min-height: 350px;
`;

const StyledATag = styled.a`
  width: 80vw;
  height: 10vh;
`;

const MenuButton = styled(Button)`
  width: 100%;
  height: 100%;
  font-size: 2.8vh;
`;
