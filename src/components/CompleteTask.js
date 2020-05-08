import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import { WeekNumber } from "./WeekNumber";

export default function CompleteTask(props) {
  const [rooms, setRooms] = useState([]);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);

  function getRoomsFromDatabase() {
    getFirebaseCollectionFrom("rooms").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setRooms(data);
      });
    });
  }

  useEffect(() => {
    getRoomsFromDatabase();
  }, []);

  function toggleGeputzt() {
    if (props.mb.geputzt) {
      getFirebaseCollectionFrom("putzplan").doc(props.mb.dbid).update({
        geputzt: false,
      });
      /* TODO: Muss noch integriert werden! -> eigene component für GIF die von 
      hier ausgelöst wird! Dann geht's auch wieder im turnery 
      setCorrectGif("erledigt");
      showGif();
      setTimeout(showGif, 3000); */
    } else {
      getFirebaseCollectionFrom("putzplan").doc(props.mb.dbid).update({
        geputzt: true,
      });
      /* 
      setCorrectGif("shame");
      showGif();
      setTimeout(showGif, 3000); */
    }
  }

  function resetDatabase() {
    props.mbs.forEach((mb) => {
      mb.room = "";
      mb.geputzt = false;
    });
  }

  function setBathRooms() {
    // MBs werden in Gruppen entsprchend der Badezimmeraufteilung aufgeteilt, Group 1 = Badezimmer 1, Group 2 = Badezimmer 2
    const setGroups = (groupname1, groupname2) => {
      // Find evey MB with Groupname 1
      for (let i = 0; i < props.mbs.length; i++) {
        if (props.mbs[i].group === "b1") {
          groupname1.push(props.mbs[i]);
        }
      }
      // Find every MB with Groupname 2
      for (let i = 0; i < props.mbs.length; i++) {
        if (props.mbs[i].group === "b2") {
          groupname2.push(props.mbs[i]);
        }
      }
    };
    setGroups(group1, group2);

    // Mittels Zufall wird ein MB aus jeder Gruppe herausgesucht
    const findOneMbFromGroup = (groupname) => {
      // Find only 1 mb
      let randomNumber = (maxNumber) =>
        Math.floor(Math.random() * Math.floor(maxNumber));
      let numberGroup = randomNumber(groupname.length);
      let mb = groupname[numberGroup];
      return mb;
    };

    // Datenbank IDs der MBs abrufen, da diese später für den Rückschrieb in die Datenbank benötigt werden.
    let IDfromgroup1 = findOneMbFromGroup(group1).dbid;
    let IDfromgroup2 = findOneMbFromGroup(group2).dbid;

    // Badezimmer zuteilen
    const setOneBathRoom = (id, bathroomname) => {
      let mb = props.mbs.find((mb) => mb.dbid === id);
      mb.room = bathroomname;
    };
    setOneBathRoom(IDfromgroup1, rooms.bathrooms[0]);
    setOneBathRoom(IDfromgroup2, rooms.bathrooms[1]);
  }

  function setOtherRooms() {
    let usedNumbers = [];
    let forOtherRooms = [];
    while (usedNumbers.length < rooms.otherrooms.length) {
      var n = Math.floor(Math.random() * Math.floor(rooms.otherrooms.length));
      if (usedNumbers.indexOf(n) === -1) usedNumbers.push(n);
    }
    // Alle aus MBs, die bisher kein Room zugeteilt bekommen haben werden in forOtherRooms gespeichert
    props.mbs.forEach((mb) => {
      if (mb.room === "") {
        forOtherRooms.push(mb);
      }
    });
    // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
    for (let i = 0; i < forOtherRooms.length; i++) {
      forOtherRooms[usedNumbers[i]].room = rooms.otherrooms[usedNumbers[i]];
    }
  }

  function checkForWeeklyUpdate() {
    toggleGeputzt();

    let everystatus = [];
    props.mbs.forEach((mb) => {
      if (mb.geputzt === true) {
        everystatus.push(mb.geputzt);
      }
    });

    if (everystatus.length === props.mbs.length) {
      // reset Database to room = "" and geputzt = false
      resetDatabase();
      // Badezimmer zuordnen
      setBathRooms();
      // restliche Räume zuordnen
      setOtherRooms();
      // Daten aus mbs State in Datenbank hochladen
      props.mbs.forEach((mb) => {
        getFirebaseCollectionFrom("putzplan").doc(mb.dbid).update({
          room: mb.room,
          geputzt: false,
        });
      });

      getFirebaseCollectionFrom("administration").doc(props.orgas.dbid).update({
        lastupdate: new Date(),
        weeknumber: WeekNumber().nextweek,
      });

      alert(
        "Du hast als letztes geputzt... das ist nichts schlechtes! Immerhin hast du dafür gesorgt, dass die Verteilung für die nächste Woche zufällig neu entschieden wurde! Hab noch einen schönen restlichen Tag!",
      );
    }
  }

  return (
    <div>
      {props.mb.geputzt && <h1>Für diese Woche bist du durch!</h1>}
      {props.mb.geputzt === false ? (
        <button onClick={toggleGeputzt} className="button">
          Erledigt!
        </button>
      ) : (
        <button onClick={toggleGeputzt} className="button button--changeback">
          Upsi doch nicht ... mach mal wieder zurück
        </button>
      )}
    </div>
  );
}
