import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { ThemeMode, AppTheme } from "../App";
import { UserData } from "../App";

export default function WelcomeName(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  const user = useContext(UserData);

  return (
    <Wrapper>
      {props.mbforview.dbid === user.userid ? (
        <>
          <WelcomeMB thememode={thememode} apptheme={apptheme}>
            Moin{" "}
            {typeof props.mbforview === "undefined" ? (
              <Redirect to="/" />
            ) : (
              props.mbforview.name
            )}
            !
          </WelcomeMB>
          <Description thememode={thememode} apptheme={apptheme}>
            {props.mbforview.geputzt
              ? "Für diese Woche bist du durch!"
              : "Hast du für diese Woche alles erledigt?"}
          </Description>
        </>
      ) : (
        <>
          {/* <WelcomeMB thememode={thememode} apptheme={apptheme}>
            Moin
          </WelcomeMB> */}
          <Description thememode={thememode} apptheme={apptheme}>
            {typeof props.mbforview === "undefined" ? (
              <Redirect to="/" />
            ) : (
              props.mbforview.name
            )}
            's Aufgabe für diese Woche!
          </Description>
        </>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
`;
const WelcomeMB = styled.h1`
  font-family: ${(props) => props.theme.general.fontFamily.headline};
  font-size: ${(props) => props.theme.general.fontSizes.headline};
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.headline};
  text-align: center;
`;

const Description = styled.h6`
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  margin-bottom: 6vh;
`;
