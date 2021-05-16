import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeMode, AppTheme } from "../App";

export default function AppTitle(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);

  return (
    <TitleWrapper className={props.className}>
      <TitleHeadline thememode={thememode} apptheme={apptheme}>
        {props.appdetails.name}
      </TitleHeadline>
      <TitleDescription thememode={thememode} apptheme={apptheme}>
        {props.appdetails.description}
      </TitleDescription>
    </TitleWrapper>
  );
}
const TitleWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 8vh;
  padding: 0 3%;
`;

const TitleHeadline = styled.h1`
  font-family: ${(props) => props.theme.general.fontFamily.headline};
  font-size: ${(props) => props.theme.general.fontSizes.headline};

  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.headline};
  width: 100%;
  margin-left: -3px;
`;
const TitleDescription = styled.h2`
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  margin-top: 10px;
  width: 100%;
`;
