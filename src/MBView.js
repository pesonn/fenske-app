import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import data from "./werputztwas";

function MBView({ match }) {
  //TODO: funktioniert aktuell nicht mit State... gibt "undefined" zurück.
  /*  useEffect(() => {
    loadData();
  }, []);
  const [zuteil, setZuteil] = useState({});

  const loadData = () => {
    setZuteil({ ordnung: data.zuteilung });
  };
  console.log(zuteil.find(item => item.id === 1));
 */

  const mb = data.zuteilung;

  console.log(match);

  return (
    <div>
      <h1>Hello MB</h1>
    </div>
  );
}

export default MBView;
