import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Overview from "./Overview";
import MBView from "./MBView";
import "./App.css";
import data from "./werputztwas";

function App() {
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
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Overview} />
          <Route path="/:name" component={MBView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
