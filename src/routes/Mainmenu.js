import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import AppTitle from "../components/AppTitle";

export default function Mainmenu(props) {
  return (
    <MenuWrapper>
      <StyledAppTitle
        thememode={props.thememode}
        apptheme="mainmenu"
        appdetails={{
          name: "Fenske.app",
          description: "Was möchtest du machen?",
        }}
      ></StyledAppTitle>
      <a href="/putzt">
        <MenuButton apptheme={"putzt"} thememode={props.thememode}>
          Putzt
        </MenuButton>
      </a>
      <a href="/glotzt">
        <MenuButton apptheme={"glotzt"} thememode={props.thememode}>
          Glotzt
        </MenuButton>
      </a>
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
