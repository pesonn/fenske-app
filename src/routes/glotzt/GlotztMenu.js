import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import AppTitle from "../../components/AppTitle";

export default function GlotztMenu(props) {
  return (
    <Menuwrapper>
      <StyledAppTitle
        thememode={props.thememode}
        apptheme={props.apptheme}
        className={props.className}
        appdetails={{
          name: "Fenske glotzt!",
          description: "Wähle einen Modus aus!",
        }}
      ></StyledAppTitle>
      <a href="/glotzt/rausvoten">
        <MenuButton thememode={props.thememode} apptheme={props.apptheme}>
          Rausvoten
        </MenuButton>
      </a>
      <a href="/glotzt/bepunktet">
        <MenuButton thememode={props.thememode} apptheme={props.apptheme}>
          Bepunktet
        </MenuButton>
      </a>
      <a href="/glotzt/top100">
        <MenuButton thememode={props.thememode} apptheme={props.apptheme}>
          Top 100 Poster
        </MenuButton>
      </a>
    </Menuwrapper>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 5vh;
`;

const Menuwrapper = styled.div`
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
