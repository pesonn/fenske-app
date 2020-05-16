import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OverviewName from "../components/OverviewName";
// import "../App.css";
// import "../index.css";
// import "../styles/generals.css";
// import "../styles/Overview.css";

import { getFirebaseCollectionFrom } from "../firebase";
import styled from "styled-components";
import AppTitle from "../components/AppTitle";

function Overview() {
  const [mbs, setMBs] = useState([]);
  const [appDetails, setAppDetails] = useState({
    name: "Fenske putzt!",
    description: "Das ist euer Putzplan für diese Woche:",
  });

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

  const OverviewList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70vw;
    margin-left: 10vw;
    padding: 5vh 0 0 0;
    min-height: 350px;
  `;

  const ListOfNames = styled.section`
    height: 50vh;
    margin-top: 3vh;
    display: flex;
    flex-wrap: wrap;
  `;

  const LegalsLink = styled.sub`
    position: absolute;
    bottom: 15px;
    right: 30px;
    font-size: 0.8rem;
  `;

  return (
    <>
      <OverviewList>
        <AppTitle appdetails={appDetails} />
        <ListOfNames>
          {mbs.map((item) => (
            <OverviewName item={item} />
          ))}
        </ListOfNames>
      </OverviewList>
      <LegalsLink>
        <Link to="/Legals">Legals</Link>
      </LegalsLink>
    </>
  );
}

export default Overview;
