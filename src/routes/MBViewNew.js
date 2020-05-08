import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WelcomeName from "../components/WelcomeName";
import { getFirebaseCollectionFrom } from "../firebase";

import "../App.css";
import "../styles/generals.css";
import "../styles/MBView.css";
import DisplayTask from "../components/DisplayTask";

export default function MBViewNew(props) {
  const { name } = useParams();
  const [mb, setMB] = useState([]);
  const [orgas, setOrgas] = useState({ data: {}, dbid: null });

  /* TODO: Data should be fetched in Overview.js
   setMB(props.mbs.find((item) => item.name === name));
  */

  function getUsersFromDatabase() {
    getFirebaseCollectionFrom("putzplan").onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
      });
      // setMBs(dbdata); Brauche ich glaube ich nicht!

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

  useEffect(() => {
    getUsersFromDatabase();
    getOrgaStuffFromDatabase();
  }, []);

  return (
    <div className="background">
      {console.log(mb)}
      <WelcomeName mb={mb} />
      <div className="mb_wrapper">
        <div className="mbview ">
          <DisplayTask mb={mb} orgas={orgas} />
        </div>
      </div>
    </div>
  );
}
