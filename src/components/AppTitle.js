import React from "react";
import styled from "styled-components";

export default function AppTitle(props) {
  return (
    <AppWrapper className={props.className}>
      <AppName thememode={props.thememode} apptheme={props.apptheme}>
        {props.appdetails.name}
      </AppName>
      <AppDescription thememode={props.thememode} apptheme={props.apptheme}>
        {props.appdetails.description}
      </AppDescription>
    </AppWrapper>
  );
}
const AppWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 8vh;
`;

const AppName = styled.h1`
  font-family: ${(props) => props.theme.general.fontFamily.headline};
  font-size: ${(props) => props.theme.general.fontSizes.headline};

  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.headline};
  width: 100%;
  margin-left: -3px;
`;
const AppDescription = styled.h2`
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  margin-top: 10px;
  width: 100%;
`;
