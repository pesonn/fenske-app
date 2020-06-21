import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";
import Movielist from "./Movielist";
import Div100vh from "react-div-100vh";

export default function GenerateMovieList(props) {
  return (
    <FullvhMenuWrapper style={{ height: "72rvh" }}>
      <Movielist
        thememode={props.thememode}
        apptheme={props.apptheme}
        gamename="Rausvoten"
        database="rausvoten"
        activegameid={props.activegameid}
        showtogglebuttons={props.showtogglebuttons}
        showdeletebutton={props.showdeletebutton}
      ></Movielist>
    </FullvhMenuWrapper>
  );
}

const FullvhMenuWrapper = styled(Div100vh)`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  width: 94vw;
  margin-left: 4vw;
  padding: 0vh 0 0 0;
  overflow: auto;
`;
