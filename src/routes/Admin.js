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

  let dibidada = { dbid: "" };
  const updateDataInDatabase = () => {
    getFirebaseCollectionFrom("rausvoten").doc("Findet Nemo").add({
      name: "Findet Nemo",
      active: true,
      provider: "Disney+",
    });

    getFirebaseCollectionFrom("rausvoten")
      .doc("HfRKCameXsXlLZzWhbiF")
      .collection("movielist")
      .doc("Harry Potter")
      .update({
        active: false,
      });
    console.log(data);

    getFirebaseCollectionFrom("rausvoten")
      .doc("HfRKCameXsXlLZzWhbiF")
      .collection("movielist")
      .doc(dibidada.dbid)
      .update({
        active: false,
      });
  };

  return (
    <>
      <AppTitle
        appdetails={{ name: "Hello Admin", description: "" }}
        thememode={props.thememode}
        apptheme={props.apptheme}
      ></AppTitle>
      <Button
        onClick={updateDataInDatabase}
        thememode={props.thememode}
        apptheme={props.apptheme}
      >
        starte den Test
      </Button>
      {console.log(data)}
    </>
  );
}
