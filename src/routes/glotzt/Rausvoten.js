import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getFirebaseCollectionFrom } from "../../firebase";
import styled from "styled-components";
import NoActiveGame from "../../components/NoActiveGame";
import Button from "../../components/Button";
import AppTitle from "../../components/AppTitle";
import StartGame from "../../components/StartGame";
import GenerateMovieList from "../../components/GenerateMovieList";
import AddToMovielist from "../../components/AddToMovielist";
import Div100vh from "react-div-100vh";

export default function Rausvoten(props) {

  const [currentGame, setCurrentGame] = useState({})
  const [activeGame, setActiveGame] = useState({
    dbid: props.user.rausvotenActiveID,
    showtogglebuttons: false,
    showdeletebutton: true,
    isVoting: false,
  });

  const setGameId = (id) => {
    setActiveGame({ ...activeGame, dbid: id });
  };

  const goToVoting = () => {
    setActiveGame({
      ...activeGame,
      showtogglebuttons: true,
      showdeletebutton: false,
      isVoting: true,
    });
  };

  const closeGame = () => {
    getFirebaseCollectionFrom("rausvoten-game").doc(activeGame.dbid).update({
      active: false,
    });
  };

  useEffect(() => {
    // getFirebaseCollectionFrom("")
  })
  return (
    <>
      {activeGame.dbid === "" && (
        <StartGame
          gamename="Rausvoten"
          database="rausvoten"
          setGameId={setGameId}
        ></StartGame>
      )}
      {activeGame.dbid !== "" && !activeGame.isVoting && (
        <FullvhMenuWrapper>
          <StyledAppTitle
            className={props.className}
            appdetails={{
              name: "Rausvoten",
              description: "Welche Filme möchtest du heute sehen?",
            }}
          />
          <PositionedButton className={props.className} onClick={goToVoting}>
            Ok hab alle
          </PositionedButton>

          <GenerateMovieList
            gamename="Rausvoten"
            database="rausvoten-game"
            activegameid={activeGame.dbid}
            showtogglebuttons={activeGame.showtogglebuttons}
            showdeletebutton={activeGame.showdeletebutton}
            listheight="72rvh"
          />
          <AddToMovielist
            gamename="Rausvoten"
            database="rausvoten"
            activegameid={activeGame.dbid}
          />
        </FullvhMenuWrapper>
      )}
      {/* Ansicht für das Voting */}
      {activeGame.isVoting && (
        <FullvhMenuWrapper>
          <StyledAppTitle
            className={props.className}
            appdetails={{
              name: "Rausvoten",
              description:
                "Jetzt schmeiß alle Filme raus, die du nicht sehen willst!",
            }}
          />
          <PositionedButton className={props.className} onClick={closeGame}>
            Abschließen
          </PositionedButton>
          <GenerateMovieList
            gamename="Rausvoten"
            database="rausvoten-game"
            activegameid={activeGame.dbid}
            showtogglebuttons={activeGame.showtogglebuttons}
            showdeletebutton={activeGame.showdeletebutton}
            listheight="83rvh"
          />
        </FullvhMenuWrapper>
      )}
      {console.log(activeGame)}
    </>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-top: 3vh;
  margin-bottom: 2vh;
  h1 {
    font-size: 4vh;
  }
`;

const FullvhMenuWrapper = styled(Div100vh)`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 80vw;
  margin-left: 10vw;
  padding: 0vh 0 0 0;
  min-height: 300px;
  overflow: hidden;
`;

const PositionedButton = styled(Button)`
  position: absolute;
  top: 3.8vh;
  right: 10vw;
  width: 11vh;
  height: 3vh;
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
`;
