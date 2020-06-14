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

export default function Rausvoten(props) {
  const [activeGame, setActiveGame] = useState({
    dbid: "",
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
    getFirebaseCollectionFrom("rausvoten").doc(activeGame.dbid).update({
      active: false,
    });
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
      {activeGame.dbid !== "" && !activeGame.isVoting && (
        <MenuWrapper>
          <StyledAppTitle
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            appdetails={{
              name: "Rausvoten",
              description: "Welche Filme möchtest du heute sehen?",
            }}
          />
          <PositionedButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            onClick={goToVoting}
          >
            Ok hab alle
          </PositionedButton>

          <GenerateMovieList
            thememode={props.thememode}
            apptheme={props.apptheme}
            gamename="Rausvoten"
            database="rausvoten"
            activegameid={activeGame.dbid}
            showtogglebuttons={activeGame.showtogglebuttons}
            showdeletebutton={activeGame.showdeletebutton}
          />
          <AddToMovielist
            thememode={props.thememode}
            apptheme={props.apptheme}
            gamename="Rausvoten"
            database="rausvoten"
            activegameid={activeGame.dbid}
          />
        </MenuWrapper>
      )}

      {activeGame.isVoting && (
        <MenuWrapper>
          <StyledAppTitle
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            appdetails={{
              name: "Rausvoten",
              description:
                "Jetzt schmeiß alle Filme raus, die du nicht sehen willst!",
            }}
          />
          <PositionedButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            onClick={closeGame}
          >
            Abschließen
          </PositionedButton>
          <GenerateMovieList
            thememode={props.thememode}
            apptheme={props.apptheme}
            gamename="Rausvoten"
            database="rausvoten"
            activegameid={activeGame.dbid}
            showtogglebuttons={activeGame.showtogglebuttons}
            showdeletebutton={activeGame.showdeletebutton}
          />
        </MenuWrapper>
      )}
      {console.log(activeGame)}
    </>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-top: 3vh;
  margin-bottom: 4vh;
  h1 {
    font-size: 4vh;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  height: 85vh;
  width: 80vw;
  margin-left: 10vw;
  padding: 0vh 0 0 0;
  min-height: 300px;
  overflow: hidden;
`;

const PositionedButton = styled(Button)`
  position: absolute;
  top: 4vh;
  right: 9vw;
  width: 11vh;
  height: 3vh;
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
`;