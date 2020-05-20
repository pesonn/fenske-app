import React from "react";
import styled from "styled-components";

export default function Button(props) {
  const thememode = props.thememode;
  const apptheme = props.apptheme;
  const Button = styled.button`
    width: 23vh;
    height: 5vh;
    border: 0;
    background-color: ${(props) =>
      props.theme[thememode][apptheme].colors.button};
    color: ${(props) => props.theme[thememode].maincolors.white};
    font-family: ${(props) => props.theme.general.fontFamily.subline};
    font-size: ${(props) => props.theme.general.fontSizes.subline};
    box-shadow: 0px 4px 6px
      ${(props) => props.theme[thememode][apptheme].colors.buttonShadow};
  `;

  return <Button onClick={props.callFunction}>{props.text}</Button>;
}
