import React, { useState, useEffect, useContext } from "react";
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
import { UserData } from "../../App";
import { Share } from "react-bootstrap-icons"
import { ThemeMode, AppTheme } from "../../App";
import Alert from "react-bootstrap/Alert"

export default function Rausvoten(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);

  const user = useContext(UserData);
  const [activeGame, setActiveGame] = useState({
    dbid: props.user.rausvotenActiveID,
    showtogglebuttons: false,
    showdeletebutton: true,
    isVoting: false,
  });
  const [gamedata, setGamedata] = useState({})

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
    getFirebaseCollectionFrom("users").doc(user.userid).update({
      rausvotenActiveID: ""
    })
  };

  const getGameData = () => {
    getFirebaseCollectionFrom("rausvoten-game").doc(activeGame.dbid)
      .onSnapshot((snapshot) => {
        setGamedata({
          ...snapshot.data(),
        });
      });
  }

  useEffect(() => {
    getGameData()
  }, [])

  const shareInvite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Weitere Mitspieler einladen',
        url: 'https://fenske.app',
        text: "voll coool"
      }).then(() => {
        console.log('Thanks for sharing!');
      })
        .catch(console.error);
    } else {
      alert(`Teile diesen Link um Freunde einzuladen: https://fenske.app/invite/rausvoten/${gamedata.invitecode}`)
    }
  }


  return (
    <>
      {/* 
      Wird glaube ich nicht mehr gebraucht!
      {activeGame.dbid === "" && (
        <StartGame
          gamename="Rausvoten"
          database="rausvoten-game"
          setGameId={setGameId}
        ></StartGame>
      )} */}
      {activeGame.dbid !== "" && !activeGame.isVoting && (
        <FullvhMenuWrapper>
          <StyledAppTitle
            className={props.className}
            appdetails={{
              name: "Rausvoten",
              description: "Welche Filme möchtest du heute sehen?",
            }}
          >
          </StyledAppTitle>
          <a href="#/" onClick={shareInvite}>
            <StyledShare thememode={thememode} apptheme={apptheme} size={20} />
          </a>
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
            database="rausvoten-game"
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

const StyledShare = styled(Share)`
  color: ${(props) => props.theme[props.thememode][props.apptheme].colors.button};
  position: absolute;
  top: 4%;
  left: 0%;
`
