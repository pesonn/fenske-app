import React from "react";
import Button from "./Button";
import styled from "styled-components";
import Inputfield from "./Inputfield";

export default function AddToMovielist(props) {
  /*
  1. Eingabefeld -> eigene component
  2. eingegeben Namen per props an Providerauswahl, von da in Datenbank schieben und zurück zur Movielist Übersicht
  */
  return (
    <Wrapper>
      <Inputfield
        thememode={props.thememode}
        apptheme={props.apptheme}
        gamename={props.gamename}
        database={props.database}
        activegameid={props.activegameid}
      ></Inputfield>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 5vh;
  left: 1vh;
`;
