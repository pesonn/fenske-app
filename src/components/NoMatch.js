import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../App.css";

function NoMatch() {
  return (
    <div className="App4">
      <h1>Danke für deinen Einsatz! Aber hier muss nicht geputzt werden. </h1>
      <h1>Guck lieber nochmal hier :</h1>
      {/* <Link to="/">
        <button type="button ">Hier geht's weiter</button>
      </Link> */}
    </div>
  );
}

export default NoMatch;
