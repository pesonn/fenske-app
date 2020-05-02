import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const Background = styled.div`
    height: 100vh;
    width: 100vw;
    background: #00f8ff;
    background: linear-gradient(47deg, #00f8ff 0%, #00f8ff 23%, #990098 100%);
  `;

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

  const Name = styled.h1`
    margin: 0 10% 0 10%;
    width: 80%;
    max-width: 900px;
    min-width: 300px;
    font-size: 6vh;

    & .emoji {
      font-size: 5vh;
      margin: 0 0 0 15px;
    }
  `;

  const Legals = styled.sub`
    position: absolute;
    bottom: 15px;
    right: 30px;
    font-size: 0.8rem;
  `;

  return (
    <Background>
      <OverviewWrapper>
        <ListOfNames>
          {mbs.map((item) => (
            <Name key={item.id}>
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
                  <Emoji className="emoji" symbol="✅" />
                ) : (
                  <Emoji className="emoji" symbol="❌" />
                )}
              </Link>
            </Name>
          ))}
        </ListOfNames>
      </OverviewWrapper>
      <Legals>
        <Link to="/Legals">Legals</Link>
      </Legals>
    </Background>
  );
}

export default Overview;
