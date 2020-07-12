import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeMode, AppTheme } from "../App";

export default function StyledButton(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  return (
    <Button
      className={props.className}
      thememode={thememode}
      apptheme={apptheme}
      onClick={props.onClick}
      inactive={props.inactive}
    >
      {props.children}
    </Button>
  );
}
const Button = styled.button`
  width: 23vh;
  height: 5vh;
  border: 0;
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  ${(props) =>
    props.inactive
      ? css`
          background-color: #d6d6d6;
          color: #fff;
          box-shadow: 0px 0px;
          font-size: ${(props) => props.theme.general.fontSizes.smallButton};
        `
      : css`
          background-color: ${(props) =>
            props.theme[props.thememode][props.apptheme].colors.button};
          color: ${(props) => props.theme[props.thememode].maincolors.white};
          box-shadow: 0px 4px 6px
            ${(props) =>
              props.theme[props.thememode][props.apptheme].colors.buttonShadow};
          font-size: ${(props) => props.theme.general.fontSizes.subline};
        `};
`;
