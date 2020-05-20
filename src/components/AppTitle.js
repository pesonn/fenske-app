import React from "react";
import styled from "styled-components";

export default function AppTitle(props) {
  const thememode = props.thememode;
  const apptheme = props.apptheme;

  const AppWrapper = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 8vh;
  `;

  const AppName = styled.h1`
    font-family: ${(props) => props.theme.general.fontFamily.headline};
    font-size: ${(props) => props.theme.general.fontSizes.headline};

    color: ${(props) => props.theme[thememode][apptheme].colors.headline};
    width: 100%;
    margin-left: -3px;
  `;
  const AppDescription = styled.h2`
    font-family: ${(props) => props.theme.general.fontFamily.subline};
    font-size: ${(props) => props.theme.general.fontSizes.subline};
    color: ${(props) => props.theme[thememode].maincolors.text};
    margin-top: 10px;
    width: 100%;
  `;

  return (
    <AppWrapper>
      <AppName>{props.appdetails.name}</AppName>
      <AppDescription>{props.appdetails.description}</AppDescription>
    </AppWrapper>
  );
}
