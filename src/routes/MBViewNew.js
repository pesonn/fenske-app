import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WelcomeName from "../components/WelcomeName";
import { getFirebaseCollectionFrom } from "../firebase";

import "../App.css";
import "../styles/generals.css";
import "../styles/MBView.css";

export default function MBViewNew(props) {
  const { name } = useParams();
  const [mb, setMB] = useState([]);

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

  useEffect(() => {
    getUsersFromDatabase();
    console.log();
  }, []);

  return (
    <div className="background">
      {console.log(mb)}
      <WelcomeName mb={mb} />
    </div>
  );
}
