import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";

export default function Admin() {
  const [mbs, setMBs] = useState([]);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzplan").onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
        console.log(dbdata);
      });
      setMBs(dbdata);
    });
  }

  // to clear rooms and geputzt-state in Database
  function resetDatabase() {
    mbs.forEach((mb) => {
      getFirebaseCollectionFrom("putzplan")
        .doc(mb.dbid)
        .update({ geputzt: false, room: "" });
    });
  }

  useEffect(() => {
    getUsersFromDatabase();
  }, []);
  useEffect(() => {
    setGroups(group1, group2);
  }, [mbs]);

  const brooms = ["Bad 1", "Bad 2", 3, 4, 5];
  const orooms = ["Küche", "Wohnen", "Müll"];

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

  function setBathRoom(id, bathroomname) {
    getFirebaseCollectionFrom("putzplan")
      .doc(id)
      .update({ room: bathroomname });
  }

  function setNewRooms() {
    resetDatabase();
    let IDfromgroup1 = findOneMbFromGroup(group1).dbid;
    let IDfromgroup2 = findOneMbFromGroup(group2).dbid;
    console.log(IDfromgroup1);
    console.log(IDfromgroup2);

    // Badezimmer zuteilen
    setBathRoom(IDfromgroup1, "Bad 1");
    setBathRoom(IDfromgroup2, "Bad 2");
  }

  return (
    <div>
      <h1>Hello Admin</h1>
      <p></p>
      <button onClick={getUsersFromDatabase}>Los geht's!</button>
      <button onClick={setNewRooms}>zeig mal her</button>
    </div>
  );
}
