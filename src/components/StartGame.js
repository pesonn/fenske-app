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
  const setGameId = () => {
    getFirebaseCollectionFrom(props.database).onSnapshot((snapshot) => {
      const dbdata = [];
      let activegameid = "";
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
      });
      activegameid = dbdata.find((item) => item.active === true);
      activegameid ? props.setGameId(activegameid.dbid) : props.setGameId("");
    });
  };

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
    setGameId();
  };

  useEffect(() => {
    getDataFromDatabase();
  }, []);
  const setGameUp = () => {
    getFirebaseCollectionFrom(props.database).add({
      active: true,
      gamemode: props.gamename,
      date: new Date(),
    });
    setGameId();
  };

  return (
    <>
      <NoActiveGame
        thememode={props.thememode}
        apptheme={props.apptheme}
        appdetails={{
          name: props.gamename,
          description: "Aktuell läuft kein Spiel.",
        }}
        setgameup={setGameUp}
      ></NoActiveGame>
    </>
  );
}
