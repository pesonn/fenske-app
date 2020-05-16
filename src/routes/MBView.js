import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirebaseCollectionFrom } from "../firebase";
import styled from "styled-components";
import WelcomeName from "../components/WelcomeName";
import DisplayTask from "../components/DisplayTask";
import CompleteTask from "../components/CompleteTask";
import ShowGifOverlay from "../components/ShowGifOverlay";

/* import "../App.css";
import "../styles/generals.css";
import "../styles/MBView.css"; */

export default function MBViewNew() {
  const { name } = useParams();
  const [mb, setMB] = useState([]);
  const [displayGif, setDisplayGif] = useState(false);
  const [orgas, setOrgas] = useState({ data: {}, dbid: null });
  const [gifs, setGifs] = useState([]);
  const [showGif, setShowGif] = useState({});

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzplan").onSnapshot((snapshot) => {
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

  //TODO: Data should be fetched in Overview.js
  function getOrgaStuffFromDatabase() {
    getFirebaseCollectionFrom("administration").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        setOrgas({ data: data, dbid: dbid });
      });
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

  useEffect(() => {
    getUsersFromDatabase();
    getGifs();
    getOrgaStuffFromDatabase();
  }, []);

  function toggleGif() {
    displayGif ? setDisplayGif(false) : setDisplayGif(true);
  }

  function selectGif(name) {
    setShowGif(gifs.find((item) => item.gifname === name));
    toggleGif();
  }

  const MBViewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 18vh;
  `;

  return (
    <MBViewWrapper className="wrapper">
      <WelcomeName mb={mb} />
      <ShowGifOverlay
        displaygif={displayGif}
        showGif={showGif}
        toggleGif={toggleGif}
        className="giphy-embed"
      />
      <DisplayTask mb={mb} orgas={orgas} />
      <CompleteTask mb={mb} orgas={orgas} startGif={selectGif} />
    </MBViewWrapper>
  );
}
