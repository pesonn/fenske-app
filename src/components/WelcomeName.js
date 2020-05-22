import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

export default function WelcomeName(props) {
  return (
    <Wrapper>
      <WelcomeMB thememode={props.thememode} apptheme={props.apptheme}>
        Moin{" "}
        {typeof props.mb === "undefined" ? <Redirect to="/" /> : props.mb.name}!
      </WelcomeMB>
      <Description thememode={props.thememode} apptheme={props.apptheme}>
        {props.mb.geputzt
          ? "Für diese Woche bist du durch!"
          : "Hast du für diese Woche alles erledigt?"}
      </Description>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
`;
const WelcomeMB = styled.h1`
  font-family: ${(props) => props.theme.general.fontFamily.headline};
  font-size: ${(props) => props.theme.general.fontSizes.headline};
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.headline};
`;

const Description = styled.h6`
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  margin-bottom: 6vh;
`;
