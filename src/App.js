import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./werputztwas";

function App() {
  useEffect(() => {
    loadData();
  }, []);
  const [zuteil, setZuteil] = useState([]);

  const loadData = () => {
    setZuteil(data.zuteilung);
  };

  console.log(zuteil);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World</p>
        {zuteil.map(zt => (
          <p key={zt.id}>{zt.name}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
