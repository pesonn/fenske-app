import React from "react";
import styled from "styled-components";

export default function AppTitle(props) {
  const AppWrapper = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 8vh;
  `;

  const AppName = styled.h1`
    font-family: ${(props) => props.theme.main.fontFamily.headline};
    font-size: ${(props) => props.theme.main.fontSizes.headline};

    color: ${(props) => props.theme.putzt.colors.headline};
    width: 100%;
    margin-left: -3px;
  `;
  const AppDescription = styled.h2`
    font-family: ${(props) => props.theme.main.fontFamily.subline};
    font-size: ${(props) => props.theme.main.fontSizes.subline};
    color: ${(props) => props.theme.main.colors.text};
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
