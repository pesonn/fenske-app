import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import styled from "styled-components";
import NoActiveGame from "./NoActiveGame";

export default function StartGame(props) {
  /* 
1. Prüfen, ob bereits ein actives Spiel vorhanden ist.
    Wenn nicht, neues Spiel anlegen und erneut prüfen, um Daten aus Datenbank zu rufen.
2. Wenn actives spiel da ist Daten reinladen. 

==> Button "neues Spiel starten"
==> Component für die Listenansicht

*/

  const [gamedetails, setGamedetails] = useState({
    activeGame: false,
  });

  const getDataFromDatabase = () => {
    getFirebaseCollectionFrom(props.database).onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        dbdata.push(data);
        dbdata.every((item) => item.active === false)
          ? setGamedetails({ activeGame: false })
          : setGamedetails({ activeGame: true });
      });
    });
  };

  useEffect(() => {
    getDataFromDatabase();
  }, []);

  const startgame = () => {
    getFirebaseCollectionFrom(props.gamemode).add({
      active: true,
      gamemode: props.gamename,
      date: new Date(),
      movielist: [],
    });
  };

  return (
    <>
      {!gamedetails.activeGame && (
        <NoActiveGame
          thememode={props.thememode}
          apptheme={props.apptheme}
          appdetails={{
            name: props.gamename,
            description: "Aktuell läuft kein Spiel.",
          }}
          startgame={startgame}
        ></NoActiveGame>
      )}
    </>
  );
}

/* const MenuWrapper = styled.div`
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

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 5vh;
  h1 {
    font-size: 3vh;
  }
`; */
