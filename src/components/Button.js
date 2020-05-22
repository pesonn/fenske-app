import React from "react";
import styled from "styled-components";

export default function StyledButton(props) {
  return (
    <Button
      className={props.className}
      thememode={props.thememode}
      apptheme={props.apptheme}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
const Button = styled.button`
  width: 23vh;
  height: 5vh;
  background-color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.button};
  border: 0;
  background-color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.button};
  color: ${(props) => props.theme[props.thememode].maincolors.white};
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  box-shadow: 0px 4px 6px
    ${(props) =>
      props.theme[props.thememode][props.apptheme].colors.buttonShadow};
`;
