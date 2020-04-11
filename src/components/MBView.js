import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import "../App.css";
import "../styles/generals.css";
import "../styles/MBView.css";

import { getFirebaseCollectionFrom } from "../firebase";
import { GiphyFetch } from "@giphy/js-fetch-api";

// import getFirebaseCollection from "../getFirebase";
import Emoji from "a11y-react-emoji";

function MBView() {
  const { name } = useParams();
  const [mbs, setMBs] = useState([]);
  const [mb, setMB] = useState([]);
  const [text, setText] = useState({
    raum: "",
  });
  const [rooms, setRooms] = useState([]);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [gif, setGif] = useState({
    data: {},
    images: {},
  });

  async function getGif(id) {
    const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_apiKey);
    const result = await gf.gif(id);
    setGif({ data: result.data, images: result.data.images.original });
  }

  function texteZuordnen() {
    if (mb.room === "Bad 1" || mb.room === "Bad 2") {
      setText({ raum: "das Bad!" });
    } else if (mb.room === "Müll") {
      setText({ raum: "den Müll weg!" });
    } else if (mb.room === "Küche") {
      setText({ raum: "die Küche!" });
    } else if (mb.room === "Wohnen") {
      setText({ raum: "den Wohnbereich" });
    } else {
      setText({
        raum: "Öhh... hier stimmt was nicht. Sag mal schnell Jan Bescheid!!!",
      });
    }
  }

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzplan").onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
      });
      setMBs(dbdata);
      // set unique MB for Component View
      setMB(dbdata.find((item) => item.name === name));
    });
  }

  useEffect(() => {
    getUsersFromDatabase();
    getRoomsFromDatabase();
    getGif("vX9WcCiWwUF7G");
  }, []);

  useEffect(() => {
    setGroups(group1, group2);
    console.log(mbs);
  }, [mbs]);

  useEffect(() => {
    texteZuordnen();
  }, [mb]); //damit dieser Effect erst läuft, nachdem sich was an den Daten aus MB geändert hat

  function changeGeputzt() {
    // State muss immer zusammen mit der Datenbank aktualisiert werden
    mb.geputzt = true;
    getFirebaseCollectionFrom("putzplan").doc(mb.dbid).update({
      geputzt: mb.geputzt,
    });
  }
  function changeBackGeputzt() {
    // State muss immer zusammen mit der Datenbank aktualisiert werden
    mb.geputzt = false;
    getFirebaseCollectionFrom("putzplan").doc(mb.dbid).update({
      geputzt: mb.geputzt,
    });

    function showGif() {
      const giphy = document.querySelector(".giphy-embed");

      giphy.classList.toggle("showgif");
    }
    showGif();
    setTimeout(showGif, 3000);
  }

  function getRoomsFromDatabase() {
    getFirebaseCollectionFrom("rooms").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setRooms(data);
      });
    });
  }
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

  function updateDatabaseGeputzt() {
    mbs.forEach((mb) => {
      getFirebaseCollectionFrom("putzplan").doc(mb.dbid).update({
        geputzt: mb.geputzt,
      });
    });
  }

  function checkForWeeklyUpdate() {
    changeGeputzt();
    let everystatus = [];
    mbs.forEach((mb) => {
      if (mb.geputzt === true) {
        everystatus.push(mb.geputzt);
      }
    });

    if (everystatus.length === mbs.length) {
      // room = "", geputzt = "false"
      resetDatabase();
      // Badezimmer zuordnen
      setBathRooms();
      // restliche Räume zuordnen
      setOtherRooms();
      // Daten aus mbs State in Datenbank hochladen
      mbs.forEach((mb) => {
        getFirebaseCollectionFrom("putzplan").doc(mb.dbid).update({
          room: mb.room,
          geputzt: false,
        });
      });
      alert(
        "Du hast als letztes geputzt... das ist nichts schlechtes! Immerhin hast du dafür gesorgt, dass die Verteilung für die nächste Woche zufällig neu entschieden wurde! Hab noch einen schönen restlichen Tag!",
      );
    }
  }

  return (
    <div className="background">
      <div className="giphy-embed">
        <img src={gif.images.url} alt={gif.data.title} />
      </div>
      <div className="mb_wrapper">
        <div className="mbview ">
          <h1 className="mbview__title">
            Moin {typeof mb === "undefined" ? <Redirect to="/" /> : mb.name}!
          </h1>
          <h2 className="mbview__description">Du putzt diese Woche...</h2>
          <h1 className="mbview__room">{text.raum}</h1>
          {mb.geputzt === true ? <h1>Für diese Woche bist du durch!</h1> : null}

          {mb.geputzt === false ? (
            <button onClick={checkForWeeklyUpdate} className="button">
              Erledigt!
            </button>
          ) : (
            <button
              onClick={changeBackGeputzt}
              className="button button--changeback"
            >
              Upsi doch nicht .. mach mal wieder zurück
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MBView;
