import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import { WeekNumber } from "./WeekNumber";
import Button from "./Button";

export default function CompleteTask(props) {
  const [rooms, setRooms] = useState([]);
  const [mbs, setMBs] = useState([]);
  const [admin, setAdmin] = useState([]);
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

  function getAdministrationFromDatabase() {
    getFirebaseCollectionFrom("administration").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setAdmin(data);
      });
    });
  }

  useEffect(() => {
    getUsersFromDatabase();
    getRoomsFromDatabase();
    getAdministrationFromDatabase();
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

        // Fals die Auslosung der neuen Aufgaben in der Folgewoche erfolgt, darf nicht die nächste Woche gesetzt werden, sondern es muss die aktuelle Woche gesetzt werden.
        let correctedweeknumber;
        if (WeekNumber().nextweek - admin.weeknumber < 2) {
          correctedweeknumber = WeekNumber().nextweek;
        } else {
          correctedweeknumber = WeekNumber().thisweek;
        }

        getFirebaseCollectionFrom("administration")
          .doc(props.orgas.dbid)
          .update({
            lastupdate: new Date(),
            weeknumber: correctedweeknumber,
          });
      };
      // Damit keiner den selben Raum der letzten Woche wieder zugeteilt bekommt, wird der wert aus der Datenbank mit dem neugenerierten Wert solange verglichen, bis alle einen neuen Raum haben.
      let newrooms = 0;
      const checkForAllNewRooms = () => {
        newrooms = 0;
        for (let i = 0; i < newMBs.length; i++) {
          const element = newMBs[i];
          let oldmb = mbs.find((item) => item.name === element.name);

          if (element.room !== oldmb.room) {
            newrooms++;
          }
        }
      };

      while (newrooms !== newMBs.length) {
        setNewRooms();
        checkForAllNewRooms();
      }
    }
  }

  const checkForDouble = () => {
    toggleGeputzt();
    checkForWeeklyUpdate();
  };

  return (
    <>
      {props.mb.geputzt === false ? (
        <Button onClick={checkForDouble}>Yes! Alles erledigt!</Button>
      ) : (
        <Button onClick={toggleGeputzt}>Oh nee... zurück bitte</Button>
      )}
    </>
  );
}
