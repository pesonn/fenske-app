import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirebaseCollectionFrom } from "../../firebase";
import styled from "styled-components";
import WelcomeName from "../../components/WelcomeName";
import DisplayTask from "../../components/DisplayTask";
import CompleteTask from "../../components/CompleteTask";
import ShowGifOverlay from "../../components/ShowGifOverlay";
import { UserData } from "../../App";

export default function MBViewNew(props) {
  const { name } = useParams();
  const [mb, setMB] = useState([]);
  const [displayGif, setDisplayGif] = useState(false);
  const [orgas, setOrgas] = useState({ data: {}, dbid: null });
  const [gifs, setGifs] = useState([]);
  const [showGif, setShowGif] = useState({});
  const user = useContext(UserData);

  function getUsersFromDatabase() {
    // getFirebaseCollectionFrom("putzplan").onSnapshot((snapshot) => {
    getFirebaseCollectionFrom("putzt-app")
      .doc(user.putztID)
      .collection("subcollection")
      .onSnapshot((snapshot) => {
        const dbdata = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const dbid = doc.id;
          dbdata.push({ ...data, dbid });
        });
        // set unique MB for Component View
        setMB(dbdata.find((item) => item.name === name));
      });
  }

  function getOrgaStuffFromDatabase() {
    getFirebaseCollectionFrom("putzt-app")
      .doc(user.putztID)
      .onSnapshot((snapshot) => {
        setOrgas({ data: snapshot.data(), dbid: snapshot.id });
        // snapshot.forEach((doc) => {
        //   const data = doc.data();
        //   const dbid = doc.id;
        //   setOrgas({ data: data, dbid: dbid });
        // });
      });
  }

  async function getGifs() {
    // get GIF ID from Database
    getFirebaseCollectionFrom("gifs").onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
      });
      // console.log(dbdata);
      // let gifname = dbdata.find((item) => item.gifname === dbdata.)
      const datafromdb = [];
      dbdata.forEach((item) => {
        fetch(
          `https://api.giphy.com/v1/gifs/${item.gifid}?api_key=${process.env.REACT_APP_GIPHY_apiKey}`,
        )
          .then((response) => response.json())
          .then((data) => {
            datafromdb.push({
              data: data.data,
              images: data.data.images.original,
              gifname: item.gifname,
            });
            setGifs(datafromdb);
          });
      });
    });
  }

  /* useEffect(() => {
    getUsersFromDatabase();
    // getGifs();
    getOrgaStuffFromDatabase();
    console.log("hello" + name);
  }, []); */

  function toggleGif() {
    displayGif ? setDisplayGif(false) : setDisplayGif(true);
  }

  function selectGif(name) {
    setShowGif(gifs.find((item) => item.gifname === name));
    toggleGif();
  }

  return (
    <>
      {/* <ShowGifOverlay
        displaygif={displayGif}
        showGif={showGif}
        toggleGif={toggleGif}
        className="giphy-embed"
      /> */}
      <MBViewWrapper className="wrapper">
        <DisplayTask mb={mb} orgas={orgas} />
        <WelcomeName mb={mb} />
        <CompleteTask mb={mb} orgas={orgas} startGif={selectGif} />
      </MBViewWrapper>
    </>
  );
}

const MBViewWrapper = styled.div`
  height: 75vh;
  min-height: 350px;
  ${"" /* padding-top: 9vh; */}
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
`;
