import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import firebase, { getFirebaseCollectionFrom } from "../../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OverviewName from "../../components/OverviewName";
import AppTitle from "../../components/AppTitle";
import Button from "../../components/Button";
import { UserData } from "../../App";
import CompleteTask from "../../components/CompleteTask";
import { Putzplanung, PutzplanGroupData } from "./Overview";
import { WeekNumber } from "../../components/WeekNumber";

export default function OverviewFirstDraw(props) {
  const user = useContext(UserData);
  const putzplanung = useContext(Putzplanung);
  const putzplandata = useContext(PutzplanGroupData);
  const [mbs, setMBs] = useState([]);

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzt-app")
      .doc(user.putztID)
      .collection("putzplan")
      .onSnapshot((snapshot) => {
        const dbdata = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const dbid = doc.id;
          dbdata.push({ ...data, dbid, room: "" });
        });
        setMBs(dbdata);
      });
  }
  useEffect(() => {
    getUsersFromDatabase();
  }, []);

  /*   let newMBs = mbs;
const setNewRooms = () => {
    const resetMbs = () => {
      return mbs.map((item) => ({
        ...item,
        room: "",
        geputzt: false,
      }));
    };
    newMBs = resetMbs();

    // Badezimmer zuordnen
    const setBathRooms = () => {
      let usedNumbers = [];
      while (usedNumbers.length < putzplandata.rooms.bathrooms.length) {
        var n = Math.floor(
          Math.random() * Math.floor(putzplandata.rooms.bathrooms.length),
        );
        if (usedNumbers.indexOf(n) === -1) {
          usedNumbers.push(n);
        }
      }
      const setOneBathRoom = (group, bathroomname) => {
        let bathgroup = newMBs.filter((item) => item.group === group);
        let randomindex = Math.floor(
          Math.random() * Math.floor(bathgroup.length),
        );
        newMBs.find(
          (item) => bathgroup[randomindex].name === item.name,
        ).room = bathroomname;
      };

      setOneBathRoom("b1", putzplandata.rooms.bathrooms[0]);
      setOneBathRoom("b2", putzplandata.rooms.bathrooms[1]);
    };
    setBathRooms();

    // restliche Räume zuordnen
    const setOtherRooms = () => {
      let forOtherRooms = [];
      let usedNumbers = [];
      while (usedNumbers.length < putzplandata.rooms.otherrooms.length) {
        var n = Math.floor(
          Math.random() * Math.floor(putzplandata.rooms.otherrooms.length),
        );
        if (usedNumbers.indexOf(n) === -1) {
          usedNumbers.push(n);
        }
      }
      // Alle aus MBs, die bisher kein Room zugeteilt bekommen haben werden in forOtherRooms gespeichert
      newMBs.forEach((mb) => (mb.room === "" ? forOtherRooms.push(mb) : null));
      //usedNumbers.splice(-usedNumbers.length, forOtherRooms.length);
      console.log(usedNumbers);
      // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
      for (let i = 0; i < forOtherRooms.length; i++) {
        //TODO: Hier wirft er einen Fehler aus "cannot set property room of undefined"
        console.log(usedNumbers);
        forOtherRooms[usedNumbers[i]].room = putzplandata.rooms.otherrooms[i];
        console.log(forOtherRooms[0].room);
      }
    };
    setOtherRooms();

    // Daten aus newMBs in Datenbank hochladen
    newMBs.forEach((item) => {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .collection("putzplan")
        .doc(item.dbid)
        .update({
          room: item.room,
          geputzt: false,
        });
    });

    // Fals die Auslosung der neuen Aufgaben in der Folgewoche erfolgt, darf nicht die nächste Woche gesetzt werden, sondern es muss die aktuelle Woche gesetzt werden.
    let correctedweeknumber;
    if (WeekNumber().nextweek - putzplandata.weeknumber < 2) {
      correctedweeknumber = WeekNumber().nextweek;
    } else {
      correctedweeknumber = WeekNumber().thisweek;
    }

    getFirebaseCollectionFrom("putzt-app").doc(user.putztID).update({
      lastupdate: new Date(),
      weeknumber: correctedweeknumber,
    });
  };

  // Um eine spezielle Ansicht zum ersten Auslosen des Putzplanes zu erstellen */
  let firstDraw = () => {
    let newmbs = mbs;
    let everyroom = [];
    everyroom.push(
      ...putzplandata.rooms.bathrooms,
      ...putzplandata.rooms.otherrooms,
    );

    let usedNumbers = [];
    //TODO: Hier provisorisch auf die maximale Anzahl an Teilnehmern begrenzt
    while (usedNumbers.length < mbs.length) {
      var n = Math.floor(Math.random() * Math.floor(everyroom.length));
      if (usedNumbers.indexOf(n) === -1) {
        usedNumbers.push(n);
      }
    }
    console.log(usedNumbers);

    for (let i = 0; i < mbs.length; i++) {
      //TODO: Hier wirft er einen Fehler aus "cannot set property room of undefined"
      newmbs[i].room = everyroom[usedNumbers[i]];
    }
    console.log(newmbs);

    newmbs.forEach((item) => {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .collection("putzplan")
        .doc(item.dbid)
        .update({
          room: item.room,
          geputzt: false,
        });
    });

    getFirebaseCollectionFrom("putzt-app").doc(user.putztID).update({
      lastupdate: new Date(),
      weeknumber: WeekNumber().thisweek,
      firstDrawDone: true,
    });
  };

  // getFirebaseCollectionFrom("putzt-app")
  //   .doc(user.putztID)
  //   .onSnapshot((snapshot) => {
  //     return snapshot.data().firstDraw;})
  return (
    <>
      <OverviewList>
        <AppTitle
          appdetails={{
            name: "Fenske putzt!",
            description:
              "Sobald alle beigetreten sind könnt ihr den Putzplan starten",
          }}
        />
        <ListOfNames>
          {putzplanung.map((item) => (
            <>
              <OverviewName item={item} showindicator={false} />
            </>
          ))}
        </ListOfNames>
        <Button onClick={firstDraw}>Wir sind vollzählig!</Button>
      </OverviewList>
    </>
  );
}

const OverviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin-left: 10vw;
  padding: 8vh 0 0 0;
  min-height: 350px;
`;

const ListOfNames = styled.section`
  height: 50vh;
  width: 100%;
  margin-top: 3vh;
  display: flex;
  flex-wrap: wrap;
`;

const LegalsLink = styled.sub`
  position: absolute;
  bottom: 15px;
  right: 30px;
  font-size: 0.8rem;
`;
