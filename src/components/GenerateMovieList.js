import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";
import Movielist from "./Movielist";

export default function GenerateMovieList(props) {
  return (
    // <MenuWrapper>
    <Movielist
      thememode={props.thememode}
      apptheme={props.apptheme}
      gamename="Rausvoten"
      database="rausvoten"
      activegameid={props.activegameid}
      showtogglebuttons={props.showtogglebuttons}
      showdeletebutton={props.showdeletebutton}
    ></Movielist>
    // </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  height: 8vh;
  width: 80vw;
  margin-left: 10vw;
  padding: 0vh 0 0 0;
  min-height: 300px;
`;
