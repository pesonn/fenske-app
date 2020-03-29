import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import "../App.css";
import "../styles/MBView.css";

import firebase from "../firebase";
import Emoji from "a11y-react-emoji";

function MBView() {
  const { name } = useParams();
  const [mbs, setMBs] = useState([]);
  const [mb, setMB] = useState([]);
  const [text, setText] = useState({
    raum: "",
  });

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

  useEffect(() => {
    firebase
      .firestore()
      .collection("putzplan")
      .onSnapshot(snapshot => {
        const dbdata = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const dbid = doc.id;
          dbdata.push({ ...data, dbid });
        });
        setMBs(dbdata);
        setMB(dbdata.find(item => item.name === name));
      });
  }, []);

  useEffect(() => {
    texteZuordnen();
  }, [mb]); //damit dieser Effect erst läuft, nachdem sich was an den Daten aus MB geändert hat

  function changeGeputzt() {
    firebase
      .firestore()
      .collection("putzplan")
      .doc(mb.dbid)
      .update({ geputzt: true });
    console.log(mb.geputzt);
  }

  return (
    <div className="App-header">
      <h1>Moin {typeof mb === "undefined" ? <Redirect to="/" /> : mb.name}</h1>
      <h2>Du putzt diese Woche...</h2>
      <h1>{text.raum}</h1>

      <button onClick={changeGeputzt} className="button">
        Erledigt!!
      </button>
      {mb.geputzt === true ? <h1>Für diese Woche bist du durch!</h1> : null}
    </div>
  );
}

export default MBView;
