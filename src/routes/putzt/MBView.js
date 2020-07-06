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
  const [mbforview, setMBForView] = useState([]);
  const [putzplanData, setPutzplanData] = useState([]);
  const [displayGif, setDisplayGif] = useState(false);
  // const [orgas, setOrgas] = useState({ data: {}, dbid: null });
  const [gifs, setGifs] = useState([]);
  const [showGif, setShowGif] = useState({});
  const user = useContext(UserData);

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

  const getMBforView = () => {
    if (user) {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .collection("subcollection")
        .onSnapshot((snapshot) => {
          let dbdata = [];
          snapshot.forEach((doc) => {
            let data = doc.data();
            let dbid = doc.id;
            dbdata.push({ ...data, dbid: dbid });
          });

          setMBForView(dbdata.find((item) => item.name === name));
        });
    }
  };

  const getPutzplanData = () => {
    if (user) {
      getFirebaseCollectionFrom("putzt-app")
        .doc(user.putztID)
        .onSnapshot((snapshot) => {
          setPutzplanData(snapshot.data());
        });
    }
  };

  useEffect(() => {
    getPutzplanData();
    getMBforView();
  }, [user]);

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
        <DisplayTask mbforview={mbforview} putzplandata={putzplanData} />
        <WelcomeName mbforview={mbforview} />
        <CompleteTask
          mbforview={mbforview}
          putzplandata={putzplanData}
          startGif={selectGif}
        />
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
