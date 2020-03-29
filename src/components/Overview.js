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
      .onSnapshot(snapshot => {
        const dbdata = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          dbdata.push(data);
        });
        // const getmbsdata = mbsname => {
        //   dbdata.find(item => item.name === mbname);
        // };
        setMBs(dbdata);
      });
    console.log(mbs);
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
        {console.log(mbs)}
      </header>
    </div>
  );
}

export default Overview;
