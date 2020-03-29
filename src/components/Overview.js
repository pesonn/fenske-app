import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import firebase from "../firebase";

function Overview() {
  const [mbs, setMBs] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("putzplan")
      .orderBy("name", "asc") // sortiert anzeige alphabetisch
      .onSnapshot(snapshot => {
        const dbdata = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const dbid = doc.id;
          dbdata.push({ ...data, dbid });
        });
        setMBs(dbdata);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {mbs.map(item => (
          <h1 key={item.id}>
            <Link
              to={{
                pathname: `/${item.name || item.name.toLowerCase()}`,
                state: {
                  data: "test",
                },
              }}
            >
              {item.name}
            </Link>
          </h1>
        ))}
      </header>
    </div>
  );
}

export default Overview;
