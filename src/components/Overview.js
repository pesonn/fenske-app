import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/generals.css";
import "../styles/Overview.css";

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
    <div className="background ov_wrapper">
      <div className="nameslist">
        {mbs.map((item) => (
          <h1 key={item.id} className="nameslist__names">
            <Link
              to={{
                pathname: `/${item.name || item.name.toLowerCase()}`,
                state: {
                  data: "test",
                },
              }}
            >
              {item.name}{" "}
              {item.geputzt ? (
                <Emoji symbol="✅" />
              ) : (
                <Emoji className="emoji" symbol="❌" />
              )}
            </Link>
          </h1>
        ))}
      </div>

      <sub className="legals">
        <Link to="/Legals">Legals</Link>
      </sub>
    </div>
  );
}

export default Overview;
