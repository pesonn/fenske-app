import React from "react";
import styled, { css } from "styled-components";
import { WeekNumber } from "./WeekNumber";
import { ReactComponent as DishIcon } from "../svg-icons/Dish.svg";
import { ReactComponent as DustIcon } from "../svg-icons/Dust.svg";
import { ReactComponent as GarbageIcon } from "../svg-icons/Garbage.svg";
import { ReactComponent as ToiletIcon } from "../svg-icons/Toilet.svg";

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
        roomtext = "Müll wegbringen";
      }
    } else {
      console.error("Hier stimmt was mit der Wochennummer nicht!");
    }
  } else if (props.mb.room === "Küche") {
    roomtext = "Die Küche!";
  } else if (props.mb.room === "Wohnen") {
    roomtext = "Wohnbereich";
  } else {
    console.error(
      "Öhh... hier stimmt was nicht. Sag mal schnell Jan Bescheid!!!",
    );
  }

  const Circle = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: 36vh;
    height: 36vh;
    background-color: ${(props) => props.theme.putzt.icon.colors.background};
    border-radius: 50%;
    margin-top: 4vh;
    box-shadow: -4px -3px 7px rgba(255, 255, 255, 0.55),
      2px 3px 7px rgba(88, 88, 88, 0.25);
  `;

  const StyledIcon = css`
    width: 14vh;
    color: ${(props) => props.theme.putzt.colors.headline};
    ${"" /* TODO: #7 Create Shadow for SVGs */}
    ${"" /* box-shadow: 6px 4px 13px rgba(0, 0, 0, 0.3); */}
  `;

  const StyledDishIcon = styled(DishIcon)`
    ${StyledIcon}
  `;
  const StyledDustIcon = styled(DustIcon)`
    ${StyledIcon}
  `;
  const StyledGarbageIcon = styled(GarbageIcon)`
    ${StyledIcon};
    width: 12vh;
  `;
  const StyledToiletIcon = styled(ToiletIcon)`
    ${StyledIcon}
  `;

  const RoomDescription = styled.h6`
    margin-top: 20px;
    font-family: ${(props) => props.theme.main.fontFamily.subline};
    font-size: ${(props) => props.theme.main.fontSizes.subline};
    color: ${(props) => props.theme.putzt.icon.description.fontColor};
  `;

  const setSVG = (room) => {
    switch (room) {
      case "Küche":
        return <StyledDishIcon></StyledDishIcon>;
      case "Müll":
        return <StyledGarbageIcon></StyledGarbageIcon>;
      case "Wohnen":
        return <StyledDustIcon></StyledDustIcon>;
      case "Bad 1":
        return <StyledToiletIcon></StyledToiletIcon>;
      case "Bad 2":
        return <StyledToiletIcon></StyledToiletIcon>;
      default:
        return console.log("help");
    }
  };

  return (
    <Circle>
      {setSVG(props.mb.room)}
      <RoomDescription>{roomtext}</RoomDescription>
    </Circle>
  );
}
