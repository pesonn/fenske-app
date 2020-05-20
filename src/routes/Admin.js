import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import AppTitle from "../components/AppTitle";
import Button from "../components/Button";

export default function Admin(props) {
  const [data, setData] = useState({});

  const getDatafromDatabase = () => {
    getFirebaseCollectionFrom("test").onSnapshot((snapshot) => {
      const dbdata = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const dbid = doc.id;
        dbdata.push({ ...data, dbid });
        setData(dbdata);
      });
    });
  };

  useEffect(() => {
    getDatafromDatabase();
  }, []);

  const leer = () => {};
  const updateDataInDatabase = () => {
    getFirebaseCollectionFrom("test").add({
      active: true,
      gamemode: "game2",
      date: new Date(),
      movielist: [
        { name: "Harry Potter", active: true, provider: "DVD Regal" },
      ],
    });
  };

  return (
    <>
      <AppTitle
        appdetails={{ name: "Hello Admin", description: "" }}
        thememode={props.thememode}
        apptheme={"glotzt"}
      ></AppTitle>
      <Button
        callFunction={updateDataInDatabase}
        text="starte den Test"
        thememode={props.thememode}
        apptheme={"glotzt"}
      ></Button>
    </>
  );
}
