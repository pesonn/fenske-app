import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../../firebase";
import styled from "styled-components";
import NoActiveGame from "../../components/NoActiveGame";
import Button from "../../components/Button";
import AppTitle from "../../components/AppTitle";
import StartGame from "../../components/StartGame";
import GenerateMovieList from "../../components/GenerateMovieList";

export default function Rausvoten(props) {
  const [activeGame, setActiveGame] = useState({
    dbid: "",
  });

  const setGameId = (id) => {
    setActiveGame({ ...activeGame, dbid: id });
  };
  return (
    <>
      {activeGame.dbid === "" && (
        <StartGame
          thememode={props.thememode}
          apptheme={props.apptheme}
          gamename="Rausvoten"
          database="rausvoten"
          setGameId={setGameId}
        ></StartGame>
      )}
      <GenerateMovieList
        thememode={props.thememode}
        apptheme={props.apptheme}
        gamename="Rausvoten"
        database="rausvoten"
        activegameid={activeGame.dbid}
      ></GenerateMovieList>
      {console.log(activeGame)}
    </>
  );
}
