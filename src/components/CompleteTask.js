import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import { WeekNumber } from "./WeekNumber";

export default function CompleteTask(props) {
  const [rooms, setRooms] = useState([]);
  const [mbs, setMBs] = useState([]);
  let newMBs = mbs;

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzplan").onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
      });
      setMBs(dbdata);
    });
  }

  function getRoomsFromDatabase() {
    getFirebaseCollectionFrom("rooms").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setRooms(data);
      });
    });
  }

  useEffect(() => {
    getUsersFromDatabase();
    getRoomsFromDatabase();
  }, []);

  function toggleGeputzt() {
    if (props.mb.geputzt) {
      getFirebaseCollectionFrom("putzplan").doc(props.mb.dbid).update({
        geputzt: false,
      });
      props.startGif("shame");
    } else {
      getFirebaseCollectionFrom("putzplan").doc(props.mb.dbid).update({
        geputzt: true,
      });
      props.startGif("erledigt");
    }
  }

  function checkForWeeklyUpdate() {
    // Um zu prüfen, ob jeder seine Aufgabe abgehakt hat
    // Der aktuelle MB wird nicht geprüft, da dieser ja auf abhaken geklickt hat
    let everystatus = [];
    const mbswithoutmb = mbs.filter((item) => item.name !== props.mb.name);
    mbswithoutmb.forEach((mb) => {
      if (mb.geputzt === true) {
        everystatus.push(mb.geputzt);
      }
    });

    if (everystatus.length === mbswithoutmb.length) {
      // toggleGeputzt();
      // reset local mbs to room = "" and geputzt = false
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
        while (usedNumbers.length < rooms.bathrooms.length) {
          var n = Math.floor(
            Math.random() * Math.floor(rooms.bathrooms.length),
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

        setOneBathRoom("b1", rooms.bathrooms[0]);
        setOneBathRoom("b2", rooms.bathrooms[1]);
      };
      setBathRooms();

      // restliche Räume zuordnen
      const setOtherRooms = () => {
        let forOtherRooms = [];
        let usedNumbers = [];
        while (usedNumbers.length < rooms.otherrooms.length) {
          var n = Math.floor(
            Math.random() * Math.floor(rooms.otherrooms.length),
          );
          if (usedNumbers.indexOf(n) === -1) {
            usedNumbers.push(n);
          }
        }
        // Alle aus MBs, die bisher kein Room zugeteilt bekommen haben werden in forOtherRooms gespeichert
        newMBs.forEach((mb) =>
          mb.room === "" ? forOtherRooms.push(mb) : null,
        );
        // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
        for (let i = 0; i < forOtherRooms.length; i++) {
          forOtherRooms[usedNumbers[i]].room = rooms.otherrooms[i];
        }
      };
      setOtherRooms();

      // Daten aus newMBs in Datenbank hochladen
      newMBs.forEach((item) => {
        getFirebaseCollectionFrom("putzplan").doc(item.dbid).update({
          room: item.room,
          geputzt: false,
        });
      });

      getFirebaseCollectionFrom("administration").doc(props.orgas.dbid).update({
        lastupdate: new Date(),
        weeknumber: WeekNumber().nextweek,
      });
    }
  }
  // Damit keiner den selben Raum der letzten Woche wieder zugeteilt bekommt, wird der wert aus der Datenbank mit dem neugenerierten Wert solange verglichen, bis alle einen neuen Raum haben.
  const checkForDouble = () => {
    toggleGeputzt();
    if (
      mbs.every(
        (mb) => mb.room === newMBs.find((item) => item.name === mb.name).room,
      )
    ) {
      checkForWeeklyUpdate();
    }
  };

  return (
    <div>
      {props.mb.geputzt && <h1>Für diese Woche bist du durch!</h1>}
      {props.mb.geputzt === false ? (
        <button onClick={checkForDouble} className="button">
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