import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OverviewName from "../components/OverviewName";
// import "../App.css";
// import "../index.css";
// import "../styles/generals.css";
// import "../styles/Overview.css";

import { getFirebaseCollectionFrom } from "../firebase";
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
  const LegalsLink = styled.sub`
    position: absolute;
    bottom: 15px;
    right: 30px;
    font-size: 0.8rem;
  `;

  return (
    <div className="overview">
      <OverviewWrapper>
        {mbs.map((item) => (
          <OverviewName item={item} />
        ))}
      </OverviewWrapper>
      <LegalsLink>
        <Link to="/Legals">Legals</Link>
      </LegalsLink>
    </div>
  );
}

export default Overview;
