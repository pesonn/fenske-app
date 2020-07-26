import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import firebase, { getFirebaseCollectionFrom } from "../../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OverviewName from "../../components/OverviewName";
import AppTitle from "../../components/AppTitle";
import Button from "../../components/Button";
import { UserData } from "../../App";
import { Putzplanung, PutzplanGroupData } from "./Overview";
import { WeekNumber } from "../../components/WeekNumber";

export default function OverviewFirstDraw(props) {
  const user = useContext(UserData);
  const putzplanung = useContext(Putzplanung);
  const putzplandata = useContext(PutzplanGroupData);
  const [mbs, setMBs] = useState([]);

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzt-app")
      .doc(user.putztID)
      .collection("putzplan")
      .onSnapshot((snapshot) => {
        const dbdata = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const dbid = doc.id;
          dbdata.push({ ...data, dbid, room: "" });
        });
        setMBs(dbdata);
      });
  }
  useEffect(() => {
    getUsersFromDatabase();
  }, []);

  let firstDraw = () => {
    if (
      window.confirm(
        "Sind wirklich alle Teilnehmer dabei?\nDu kannst diesen Schritt nicht Rückgängig machen!",
      )
    ) {
      let newmbs = mbs;
      let everyroom = [];
      everyroom.push(
        ...putzplandata.rooms.bathrooms,
        ...putzplandata.rooms.otherrooms,
      );

      let usedNumbers = [];
      //TODO: Hier provisorisch auf die maximale Anzahl an Teilnehmern begrenzt
      while (usedNumbers.length < mbs.length) {
        var n = Math.floor(Math.random() * Math.floor(everyroom.length));
        if (usedNumbers.indexOf(n) === -1) {
          usedNumbers.push(n);
        }
      }
      console.log(usedNumbers);

      for (let i = 0; i < mbs.length; i++) {
        //TODO: Hier wirft er einen Fehler aus "cannot set property room of undefined"
        newmbs[i].room = everyroom[usedNumbers[i]];
      }
      console.log(newmbs);

      newmbs.forEach((item) => {
        getFirebaseCollectionFrom("putzt-app")
          .doc(user.putztID)
          .collection("putzplan")
          .doc(item.dbid)
          .update({
            room: item.room,
            geputzt: false,
          });
      });

      getFirebaseCollectionFrom("putzt-app").doc(user.putztID).update({
        lastupdate: new Date(),
        weeknumber: WeekNumber().thisweek,
        firstDrawDone: true,
      });
    }
  };

  // getFirebaseCollectionFrom("putzt-app")
  //   .doc(user.putztID)
  //   .onSnapshot((snapshot) => {
  //     return snapshot.data().firstDraw;})
  return (
    <>
      <OverviewList>
        <StyledAppTitle
          appdetails={{
            name: `Fenske putzt! - Invitecode: ${putzplandata.invitecode}`,
            description:
              "Sobald alle beigetreten sind könnt ihr den Putzplan starten",
          }}
        />
        <ListOfNames>
          {putzplanung.map((item) => (
            <OverviewName key={item.id} item={item} showindicator={false} />
          ))}
        </ListOfNames>
        <Button onClick={firstDraw}>Wir sind vollzählig!</Button>
      </OverviewList>
    </>
  );
}

const StyledAppTitle = styled(AppTitle)`
  margin-bottom: 0vh;
`;

const OverviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: top;
  width: 80vw;
  height: 80vh;
  margin-left: 10vw;
  padding: 8vh 0 0 0;
  min-height: 350px;
`;

const ListOfNames = styled.section`
  height: 60%;
  width: 100%;
  margin-top: 3vh;
  display: flex;
  flex-wrap: wrap;
`;
