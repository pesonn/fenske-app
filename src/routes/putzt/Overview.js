import React, { useState, useEffect, useContext, createContext } from "react";
import firebase, { getFirebaseCollectionFrom } from "../../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OverviewName from "../../components/OverviewName";
import AppTitle from "../../components/AppTitle";
import LogoutButton from "../../components/LogoutButton";
import { UserData } from "../../App";

export const PutzplanData = createContext();
export const Putzplanung = createContext();

export default function Overview(props) {
  const [putzplanung, setPutzplanung] = useState([]);
  const user = useContext(UserData);

  const getPutzplanung = () => {
    if (user) {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .collection("putzplan")
        .onSnapshot((snapshot) => {
          let putzplan = [];
          snapshot.forEach((doc) => {
            putzplan.push(doc.data());
          });
          setPutzplanung(putzplan);
        });
    }
  };

  useEffect(() => {
    getPutzplanung();
  }, [user]);

  return (
    <>
      <LogoutButton>Ausloggen</LogoutButton>
      <OverviewList>
        <AppTitle
          appdetails={{
            name: "Fenske putzt!",
            description: "Das ist euer Putzplan für diese Woche:",
          }}
        />
        <Putzplanung.Provider value={putzplanung}>
          <ListOfNames>
            {putzplanung.map((item) => (
              <>
                <OverviewName item={item} />
              </>
            ))}
          </ListOfNames>
        </Putzplanung.Provider>
      </OverviewList>
      <LegalsLink>
        <Link to="/Legals">Legals</Link>
      </LegalsLink>
    </>
  );
}

const OverviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin-left: 10vw;
  padding: 8vh 0 0 0;
  min-height: 350px;
`;

const ListOfNames = styled.section`
  height: 50vh;
  width: 100%;
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
