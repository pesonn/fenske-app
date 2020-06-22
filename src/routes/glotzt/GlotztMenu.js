import React, { useContext } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import AppTitle from "../../components/AppTitle";
import { ThemeMode, AppTheme } from "../../App";

export default function GlotztMenu(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  return (
    <MenuWrapper>
      <StyledAppTitle
        thememode={thememode}
        apptheme={apptheme}
        className={props.className}
        appdetails={{
          name: "Fenske glotzt!",
          description: "Wähle einen Modus aus!",
        }}
      ></StyledAppTitle>
      <a href="/glotzt/rausvoten">
        <MenuButton thememode={thememode} apptheme={apptheme}>
          Rausvoten
        </MenuButton>
      </a>
      <StyledAppTitleCOMINGSOON
        thememode={thememode}
        apptheme={apptheme}
        className={props.className}
        appdetails={{
          name: "coming soon",
          description: "",
        }}
      ></StyledAppTitleCOMINGSOON>
      {/* <a href="/glotzt/bepunktet"> */}
      <MenuButtonCOMINGSOON thememode={thememode} apptheme={apptheme}>
        Bepunktet
      </MenuButtonCOMINGSOON>
      {/* </a> */}
      {/* <a href="/glotzt/top100"> */}
      <MenuButtonCOMINGSOON thememode={thememode} apptheme={apptheme}>
        Top 100 Poster
      </MenuButtonCOMINGSOON>
      {/* </a> */}
    </MenuWrapper>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 5vh;
`;

const StyledAppTitleCOMINGSOON = styled(StyledAppTitle)`
  text-align: center;
  margin: 0 0 -35px 0;
  h1 {
    font-size: 2.5vh;
    font-family: ${(props) => props.theme.general.fontFamily.subline};
  }
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

const MenuButtonCOMINGSOON = styled(MenuButton)`
  background-color: #d6d6d6;
  box-shadow: 0 0;
`;
