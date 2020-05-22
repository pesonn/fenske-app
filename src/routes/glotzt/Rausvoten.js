import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../../firebase";
import styled from "styled-components";
import NoActiveGame from "../../components/NoActiveGame";
import Button from "../../components/Button";
import AppTitle from "../../components/AppTitle";
import StartGame from "../../components/StartGame";

export default function Rausvoten(props) {
  return (
    <>
      <StartGame
        thememode={props.thememode}
        apptheme={props.apptheme}
        gamename="Rausvoten"
        database="rausvoten"
      ></StartGame>
    </>
  );
}
