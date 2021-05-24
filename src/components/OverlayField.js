import React, { useContext, useState } from "react";
import styled from "styled-components";
import CircleIcon from "./CircleIcon";
import { ThemeMode, AppTheme } from "../App";

export default function OverlayField(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  return (
    <Wrapper
      thememode={thememode}
      apptheme={apptheme}
      className={props.className}>
      <SquareIcon>
        <ProviderWrapper>{props.children}</ProviderWrapper>
      </SquareIcon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 0;
  background-color: ${(props) =>
    props.theme[props.thememode].maincolors.background};
`;

const SquareIcon = styled(CircleIcon)`
  border-radius: 0;
  width: 70vw;
  max-width: 500px;
  height: 50vh;
  max-height: 800px;
  margin-top: -25vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ProviderWrapper = styled.section`
  ${"" /* background-color: #943; */}
  margin-top: 10%;
  width: 75%;
  height: 90%;
  display: flex;
  flex-flow: column wrap;
  justify-content: top;
`;
