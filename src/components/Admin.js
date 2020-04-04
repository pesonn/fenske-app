import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";

export default function Admin() {
  const [mbs, setMBs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);

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
    setGroups(group1, group2);
  }, [mbs]);

  // to clear rooms and geputzt-state in Database
  function resetDatabase() {
    mbs.forEach((mb) => {
      mb.room = "";
      mb.geputzt = false;
    });
  }

  // MBs werden in Gruppen entsprchend der Badezimmeraufteilung aufgeteilt, Group 1 = Badezimmer 1, Group 2 = Badezimmer 2
  function setGroups(groupname1, groupname2) {
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
  }

  function findOneMbFromGroup(groupname) {
    // Find only 1 mb
    let randomNumber = (maxNumber) =>
      Math.floor(Math.random() * Math.floor(maxNumber));
    let numberGroup = randomNumber(groupname.length);
    let mb = groupname[numberGroup];
    return mb;
  }

  function setOneBathRoom(id, bathroomname) {
    let mb = mbs.find((mb) => mb.dbid === id);
    mb.room = bathroomname;
  }

  function setBathRooms() {
    // Datenbank IDs der MBs abrufen
    let IDfromgroup1 = findOneMbFromGroup(group1).dbid;
    let IDfromgroup2 = findOneMbFromGroup(group2).dbid;
    // Badezimmer zuteilen
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
    mbs.forEach((mb) => {
      if (mb.room === "") {
        forOtherRooms.push(mb);
      }
    });
    // Da die Zahlen zufällig im Array gespeichert sind, erfolgt die Zuordnung nach Indexen
    for (let i = 0; i < forOtherRooms.length; i++) {
      forOtherRooms[usedNumbers[i]].room = rooms.otherrooms[usedNumbers[i]];
    }
  }

  function updateDatabase() {
    mbs.forEach((mb) => {
      getFirebaseCollectionFrom("putzplan").doc(mb.dbid).update({
        room: mb.room,
        geputzt: mb.geputzt,
      });
    });
  }

  function setAllRooms() {
    // room = "", geputzt = "false"
    resetDatabase();
    // Badezimmer zuordnen
    setBathRooms();
    // restliche Räume zuordnen
    setOtherRooms();
    // Daten aus mbs State in Datenbank hochladen
    updateDatabase();
  }

  return (
    <div>
      <h1>Hello Admin</h1>
      <p></p>
      <button onClick={getUsersFromDatabase}>Los geht's!</button>
      <button onClick={setBathRooms}>zeig mal her BÄDER</button>
      <button onClick={setOtherRooms}>zeig mal her die anderen</button>
      <button onClick={setAllRooms}>zeig mal her ALLE</button>
    </div>
  );
}
