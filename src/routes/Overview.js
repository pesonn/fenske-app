import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OverviewName from "../components/OverviewName";
import "../App.css";
import "../index.css";
// import "../styles/generals.css";
// import "../styles/Overview.css";

import { getFirebaseCollectionFrom } from "../firebase";
import Emoji from "a11y-react-emoji";
import styled from "styled-components";

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

  const OverviewWrapper = styled.div`
    display: flex;
  `;

  const ListOfNames = styled.section`
    height: 60vh;
    margin: 0 auto;
    margin-top: 3vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `;

  const Legals = styled.sub`
    position: absolute;
    bottom: 15px;
    right: 30px;
    font-size: 0.8rem;
  `;

  return (
    <div className="overview">
      <OverviewWrapper>
        <ListOfNames>
          {mbs.map((item) => (
            <OverviewName item={item} />
          ))}
        </ListOfNames>
      </OverviewWrapper>
      <Legals>
        <Link to="/Legals">Legals</Link>
      </Legals>
    </div>
  );
}

export default Overview;
