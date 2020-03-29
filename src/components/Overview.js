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
      .orderBy("name", "asc")
      .onSnapshot(snapshot => {
        const dbdata = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const dbid = doc.id;
          dbdata.push({ ...data, dbid });

          // for (let db = i; i <= db.length; i++) {}
          console.log(dbdata);
        });
        // const getmbsdata = mbsname => {
        //   dbdata.find(item => item.name === mbname);
        // };
        setMBs(dbdata);
      });
    console.log(mbs);
  }, []);

  //TODO: Anzeige im Overview nach alphabeth sortieren
  /*  useEffect(() => {
    function sortMbs() {
      const newMbs = mbs.sort((a, b) => a.name.localCompare(b.name));
      setMBs(newMbs);
    }
    sortMbs();
  }, [mbs]); */

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
