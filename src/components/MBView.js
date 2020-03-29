import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import "../App.css";

import firebase from "../firebase";

function MBView() {
  const { name } = useParams();
  const [mbs, setMBs] = useState([]);
  const [mb, setMB] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("putzplan")
      .onSnapshot(snapshot => {
        const dbdata = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          dbdata.push(data);
        });
        setMBs(dbdata);
        const dbname = dbdata.find(item => item.name === name);
        if (typeof dbname === undefined) {
          return;
        } else {
          setMB(dbname);
        }
      });
  }, []);

  return (
    <div>
      <p>{typeof mb === "undefined" ? <Redirect to="/" /> : mb.name}</p>
    </div>
  );
}

export default MBView;
