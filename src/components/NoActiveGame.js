import React from "react";
import styled from "styled-components";
import Button from "./Button";
import AppTitle from "./AppTitle";

export default function NoActiveGame(props) {
  return (
    <MenuWrapper>
      <StyledAppTitle
        className={props.className}
        appdetails={props.appdetails}></StyledAppTitle>
      <Button className={props.className} onClick={props.setgameup}>
        Wir woll'n jez was GlOtZen!
      </Button>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  height: 8vh;
  width: 80vw;
  padding: 0vh 0 0 0;
  min-height: 300px;
`;

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 5vh;
  h1 {
    font-size: 3vh;
  }
`;
