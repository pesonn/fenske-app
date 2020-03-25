import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import data from "./werputztwas";

function Overview() {
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

  return (
    <div className="App">
      <header className="App-header">
        {mb.map(item => (
          <h1 key={item.id}>
            <Link to={`/${item.name}`}>{item.name}</Link>
          </h1>
        ))}
      </header>
    </div>
  );
}

export default Overview;
