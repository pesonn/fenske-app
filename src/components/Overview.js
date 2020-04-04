import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { getFirebaseCollectionFrom } from "../firebase";
import Emoji from "a11y-react-emoji";

function Overview() {
  const [mbs, setMBs] = useState([]);

  useEffect(() => {
    getFirebaseCollectionFrom("putzplan")
      .orderBy("name", "asc") // sortiert anzeige alphabetisch
      .onSnapshot((snapshot) => {
        const dbdata = [];
        snapshot.forEach((doc) => {
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
        {mbs.map((item) => (
          <h1 key={item.id}>
            <Link
              to={{
                pathname: `/${item.name || item.name.toLowerCase()}`,
                state: {
                  data: "test",
                },
              }}
            >
              {item.name}{" "}
              {item.geputzt ? <Emoji symbol="✅" /> : <Emoji symbol="❌" />}
            </Link>
          </h1>
        ))}
      </header>
    </div>
  );
}

export default Overview;
