import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeMode, AppTheme } from "../App";

export default function CircleIcon(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  return (
    <Circle
      className={props.className}
      thememode={thememode}
      apptheme={apptheme}
    >
      {props.children}
    </Circle>
  );
}
const Circle = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 10vh;
  height: 10vh;
  background-color: ${(props) =>
    props.theme[props.thememode].icon.colors.background};
  border-radius: 50%;
  margin-bottom: 8vh;
  box-shadow: -4px -3px 7px rgba(255, 255, 255, 0.55),
    2px 3px 7px rgba(88, 88, 88, 0.25);
`;
