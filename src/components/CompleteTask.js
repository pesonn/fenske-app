import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import { WeekNumber } from "./WeekNumber";

export default function CompleteTask(props) {
  const [rooms, setRooms] = useState([]);
  const [mbs, setMBs] = useState([]);

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

  useEffect(() => {
    console.log(mbs);
  }, [mbs]);

  function toggleGeputzt() {
    if (props.mb.geputzt) {
      getFirebaseCollectionFrom("putzplan").doc(props.mb.dbid).update({
        geputzt: false,
      });
      props.toggleGif("shame");
    } else {
      getFirebaseCollectionFrom("putzplan").doc(props.mb.dbid).update({
        geputzt: true,
      });
      props.toggleGif("erledigt");
    }
  }

  function checkForWeeklyUpdate() {
    //TODO: Gibt es hierfür eine Möglichkeit das aufgrundlage der props zu machen oder müssen die Daten in dieser component im state gespeichert werden?

    // Um zu prüfen, ob jeder seine Aufgabe abgehakt hat
    // Der aktuelle MB wird nicht geprüft, da dieser ja auf abhaken geklickt hat
    let everystatus = [];
    const mbswithoutmb = props.mbs.filter(
      (item) => item.name !== props.mb.name,
    );
    mbswithoutmb.forEach((mb) => {
      if (mb.geputzt === true) {
        everystatus.push(mb.geputzt);
      }
    });

    if (everystatus.length === mbswithoutmb.length) {
      toggleGeputzt();
      // reset local mbs to room = "" and geputzt = false
      const resetMbs = () => {
        props.mbs.forEach((mb) => {
          mb.room = "";
          mb.geputzt = false;
        });
      };
      resetMbs();

      // Badezimmer zuordnen
      const setBathRooms = () => {
        let group1 = [];
        let group2 = [];
        // MBs werden in Gruppen entsprchend der Badezimmeraufteilung aufgeteilt, Group 1 = Badezimmer 1, Group 2 = Badezimmer 2
        const setGroups = (groupname1, groupname2) => {
          // Find evey MB with Groupname 1
          for (let i = 0; i < mbs.length; i++) {
            if (mbs[i].group === "b1") {
              groupname1.push(mbs[i]);
            }
          }
          // Find every MB with Groupname 2
          for (let i = 0; i < mbs.length; i++) {
            if (mbs[i].group === "b2") {
              groupname2.push(mbs[i]);
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
          let mb = mbs.find((mb) => mb.dbid === id);
          mb.room = bathroomname;
        };
        setOneBathRoom(IDfromgroup1, rooms.bathrooms[0]);
        setOneBathRoom(IDfromgroup2, rooms.bathrooms[1]);

        // to clear variables for next run
        group1 = [];
        group2 = [];
      };
      setBathRooms();
      // restliche Räume zuordnen
      const setOtherRooms = () => {
        let usedNumbers = [];
        let forOtherRooms = [];
        while (usedNumbers.length < rooms.otherrooms.length) {
          var n = Math.floor(
            Math.random() * Math.floor(rooms.otherrooms.length),
          );
          if (usedNumbers.indexOf(n) === -1) usedNumbers.push(n);
        }
        // Alle aus MBs, die bisher kein Room zugeteilt bekommen haben werden in forOtherRooms gespeichert
        mbs.forEach((mb) => {
          if (mb.room === "") {
            forOtherRooms.push(mb);
          }
        });
        // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
        for (let i = 0; i < forOtherRooms.length; i++) {
          forOtherRooms[usedNumbers[i]].room = rooms.otherrooms[usedNumbers[i]];
        }
      };

      setOtherRooms();

      // Daten aus mbs State in Datenbank hochladen
      mbs.forEach((item) => {
        getFirebaseCollectionFrom("putzplan").doc(item.dbid).update({
          room: item.room,
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
    } else {
      toggleGeputzt();
    }
  }

  //DEBUGGING
  const setOtherRooms = () => {
    let newstate = [];
    mbs.forEach((mb) => {
      mb.room = "";
    });

    let usedNumbers = [];
    let forOtherRooms = [];
    while (usedNumbers.length < rooms.otherrooms.length) {
      var n = Math.floor(Math.random() * Math.floor(rooms.otherrooms.length));
      if (usedNumbers.indexOf(n) === -1) usedNumbers.push(n);
    }
    // Alle aus MBs, die bisher kein Room zugeteilt bekommen haben werden in forOtherRooms gespeichert
    mbs.forEach((mb) => {
      if (mb.room === "") {
        forOtherRooms.push(mb);
      }
    });
    // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
    for (let i = 0; i < 3; i++) {
      forOtherRooms[usedNumbers[i]].room = rooms.otherrooms[i];
      // console.log(rooms.otherrooms[usedNumbers[i]]);
    }

    setMBs(forOtherRooms);

    /* console.log(usedNumbers);
    console.log(rooms.otherrooms); */
    console.log(forOtherRooms);
  };

  function DEBUGcheckForWeeklyUpdate() {
    let newMBs = mbs;
    // reset local mbs to room = "" and geputzt = false
    const resetMbs = () => {
      return mbs.map((item) => ({
        ...item,
        room: "",
        geputzt: false,
      }));
    };
    newMBs = resetMbs();

    console.log(resetMbs());

    // Badezimmer zuordnen
    const setBathRooms = () => {
      let usedNumbers = [];
      while (usedNumbers.length < rooms.bathrooms.length) {
        var n = Math.floor(Math.random() * Math.floor(rooms.bathrooms.length));
        if (usedNumbers.indexOf(n) === -1) {
          usedNumbers.push(n);
        }
      }
      const setOneBathRoom = (group, bathroomname) => {
        console.log(newMBs.find((item) => item.group === group));
        newMBs.find((item) => item.group === group).room = bathroomname;
      };
      setOneBathRoom("b1", rooms.bathrooms[usedNumbers[0]]);
      setOneBathRoom("b2", rooms.bathrooms[usedNumbers[1]]);

      /*  let group1 = [];
      let group2 = [];
      // MBs werden in Gruppen entsprchend der Badezimmeraufteilung aufgeteilt, Group 1 = Badezimmer 1, Group 2 = Badezimmer 2
      const setGroups = (groupname1, groupname2) => {
        // Find evey MB with Groupname 1
        for (let i = 0; i < newMBs.length; i++) {
          if (newMBs[i].group === "b1") {
            groupname1.push(newMBs[i]);
          }
        }
        // Find every MB with Groupname 2
        for (let i = 0; i < newMBs.length; i++) {
          if (newMBs[i].group === "b2") {
            groupname2.push(newMBs[i]);
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

      // to clear variables for next run
      group1 = [];
      group2 = []; */
    };
    setBathRooms();

    // restliche Räume zuordnen
    const setOtherRooms = () => {
      let forOtherRooms = [];
      let usedNumbers = [];
      while (usedNumbers.length < rooms.otherrooms.length) {
        var n = Math.floor(Math.random() * Math.floor(rooms.otherrooms.length));
        if (usedNumbers.indexOf(n) === -1) {
          usedNumbers.push(n);
        }
      }
      // Alle aus MBs, die bisher kein Room zugeteilt bekommen haben werden in forOtherRooms gespeichert
      newMBs.forEach((mb) => (mb.room === "" ? forOtherRooms.push(mb) : null));
      // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
      console.log(forOtherRooms);
      for (let i = 0; i < forOtherRooms.length; i++) {
        forOtherRooms[usedNumbers[i]].room = rooms.otherrooms[i];
      }

      /*  let a = newMBs
        .find((item1) => item1.room === "")
        .map((item2) => {
          // let newmb = forOtherRooms.find((i) => i.dbid === item.dbid);

          return { ...item2, room: newmb.room };
        });

      console.log(a); 
    };

    
    console.log("Nach other Rooms");
    console.log(newMBs);

    // Daten aus mbs State in Datenbank hochladen
    /*  newMBs.forEach((item) => {
        getFirebaseCollectionFrom("putzplan").doc(item.dbid).update({
          room: item.room,
          geputzt: false,
        });
      });

      getFirebaseCollectionFrom("administration").doc(props.orgas.dbid).update({
        lastupdate: new Date(),
        weeknumber: WeekNumber().nextweek,
      });*/
    };
    setOtherRooms();
    console.log(newMBs);
  }

  return (
    <div>
      {props.mb.geputzt && <h1>Für diese Woche bist du durch!</h1>}
      {props.mb.geputzt === false ? (
        <button onClick={checkForWeeklyUpdate} className="button">
          Erledigt!
        </button>
      ) : (
        <button onClick={toggleGeputzt} className="button button--changeback">
          Upsi doch nicht ... mach mal wieder zurück
        </button>
      )}
      <button
        onClick={DEBUGcheckForWeeklyUpdate}
        className="button button--changeback"
      >
        TEST
      </button>
    </div>
  );
}
