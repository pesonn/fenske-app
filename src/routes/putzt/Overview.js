import React, { useState, useEffect, useContext, createContext } from "react";
import firebase, { getFirebaseCollectionFrom } from "../../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OverviewName from "../../components/OverviewName";
import OverviewFirstDraw from "./OverviewFirstDraw";
import AppTitle from "../../components/AppTitle";
import { UserData } from "../../App";

export const PutzplanGroupData = createContext();
export const Putzplanung = createContext();

export default function Overview(props) {
  const [putzplanung, setPutzplanung] = useState([]);
  const [putzdata, setPutzdata] = useState({});
  const user = useContext(UserData);

  const getPutztGroupData = () => {
    if (user) {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .onSnapshot((snapshot) => {
          setPutzdata({ ...snapshot.data() });
        });
    }
  };
  const getPutzplanung = () => {
    if (user) {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .collection("putzplan")
        .orderBy("name", "asc")
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
    getPutztGroupData();
  }, [user]);

  // Um eine spezielle Ansicht zum ersten Auslosen des Putzplanes zu erstellen
  let firstDraw = getFirebaseCollectionFrom("putzt-app")
    .doc(user.putztID)
    .onSnapshot((snapshot) => {
      return snapshot.data().firstDraw;
    });
  return (
    <>
      <PutzplanGroupData.Provider value={putzdata}>
        <Putzplanung.Provider value={putzplanung}>
          {putzdata.firstDrawDone ? (
            <OverviewList>
              <AppTitle
                appdetails={{
                  name: "Fenske putzt!",
                  description: "Das ist euer Putzplan für diese Woche:",
                }}
              />
              <ListOfNames>
                {putzplanung.map((item) => (
                  <>
                    <OverviewName item={item} showindicator={true} />
                  </>
                ))}
              </ListOfNames>
            </OverviewList>
          ) : (
            <OverviewFirstDraw />
          )}
        </Putzplanung.Provider>
      </PutzplanGroupData.Provider>
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
