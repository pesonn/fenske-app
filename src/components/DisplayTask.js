import React from "react";

import { WeekNumber } from "./WeekNumber";

import "../App.css";
import "../styles/generals.css";
import "../styles/MBView.css";

export default function DisplayTask(props) {
  let roomtext = "";
  if (props.mb.room === "Bad 1" || props.mb.room === "Bad 2") {
    roomtext = "das Bad!";
  } else if (props.mb.room === "Müll") {
    // Hier wird geprüft, ob die aktuelle Woche mit der aktuellen Woche übereinstimmt.
    if (WeekNumber().thisweek === props.orgas.data.weeknumber) {
      // die aktuelle Woche aus der Datenbank stimmt mit der tatsächlichen aktuellen Woche überein.
      if (WeekNumber().thisweek % 2 === 0) {
        roomtext = "den Müll weg! Denk an PLASTIK!";
      } else {
        roomtext = "den Müll weg!";
      }
    } else if (WeekNumber().nextweek === props.orgas.data.weeknumber) {
      // Wenn alle aufgaben einer Woche erledigt wurden, wird bereits auf die Wochenummer der nächsten Woche geachtet.
      if (WeekNumber().nextweek % 2 === 0) {
        roomtext = "den Müll weg! Denk an PLASTIK!";
      } else {
        roomtext = "den Müll weg!";
      }
    } else {
      console.error("Hier stimmt was mit der Wochennummer nicht!");
    }
  } else if (props.mb.room === "Küche") {
    roomtext = "die Küche!";
  } else if (props.mb.room === "Wohnen") {
    roomtext = "den Wohnbereich";
  } else {
    console.error(
      "Öhh... hier stimmt was nicht. Sag mal schnell Jan Bescheid!!!",
    );
  }

  return (
    <div>
      <h2 className="mbview__description">Du putzt diese Woche...</h2>
      <h1 className="mbview__room">{roomtext}</h1>
    </div>
  );
}
