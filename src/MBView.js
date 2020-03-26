import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import data from "./werputztwas";

function MBView({ match }) {
  const mbname = match.params.name;

  const mbraum = data.zuteilung.find(item => item.name === mbname).raum;

  console.log(mbraum);

  return (
    <div>
      <h1>Moin {mbname},</h1>
      <h2>du putzt diese Woche...</h2>
      <h1>den {mbraum}.... uuuund los!</h1>
    </div>
  );
}

export default MBView;
