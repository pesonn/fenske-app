import React from "react";
import styled, { css } from "styled-components";
import { WeekNumber } from "./WeekNumber";
import CircleIcon from "./CircleIcon";
import { ReactComponent as DishIcon } from "../svg-icons/Dish.svg";
import { ReactComponent as DustIcon } from "../svg-icons/Dust.svg";
import { ReactComponent as GarbageIcon } from "../svg-icons/Garbage.svg";
import { ReactComponent as ToiletIcon } from "../svg-icons/Toilet.svg";
import { ReactComponent as CheckedIcon } from "../svg-icons/checked.svg";

export default function DisplayTask(props) {
  let roomtext = "";
  let roomtext2 = "";
  if (props.mb.room === "Bad 1" || props.mb.room === "Bad 2") {
    roomtext = "Badezimmer";
  } else if (props.mb.room === "Müll") {
    // Hier wird geprüft, ob die aktuelle Woche mit der aktuellen Woche übereinstimmt.
    if (WeekNumber().thisweek === props.orgas.data.weeknumber) {
      // die aktuelle Woche aus der Datenbank stimmt mit der tatsächlichen aktuellen Woche überein.
      if (WeekNumber().thisweek % 2 === 0) {
        roomtext = "Müll wegbringen";
        roomtext2 = "Denk an PLASTIK!";
      } else {
        roomtext = "Müll wegbringen";
      }
    } else if (WeekNumber().nextweek === props.orgas.data.weeknumber) {
      // Wenn alle aufgaben einer Woche erledigt wurden, wird bereits auf die Wochenummer der nächsten Woche geachtet.
      if (WeekNumber().nextweek % 2 === 0) {
        roomtext = "Müll wegbringen";
        roomtext2 = "Denk an PLASTIK!";
      } else {
        roomtext = "Müll wegbringen";
      }
    } else {
      console.error("Hier stimmt was mit der Wochennummer nicht!");
    }
  } else if (props.mb.room === "Küche") {
    roomtext = "Küche";
  } else if (props.mb.room === "Wohnen") {
    roomtext = "Wohnbereich";
  } else {
    console.error(
      "Öhh... hier stimmt was nicht. Sag mal schnell Jan Bescheid!!!",
    );
  }

  const setSVG = (room) => {
    if (props.mb.geputzt) {
      return (
        <StyledCheckedIcon
          className={props.className}
          thememode={props.thememode}
          apptheme={props.apptheme}
        ></StyledCheckedIcon>
      );
    } else {
      switch (room) {
        case "Küche":
          return (
            <StyledDishIcon
              className={props.className}
              thememode={props.thememode}
              apptheme={props.apptheme}
            ></StyledDishIcon>
          );
        case "Müll":
          return (
            <StyledGarbageIcon
              className={props.className}
              thememode={props.thememode}
              apptheme={props.apptheme}
            ></StyledGarbageIcon>
          );
        case "Wohnen":
          return (
            <StyledDustIcon
              className={props.className}
              thememode={props.thememode}
              apptheme={props.apptheme}
            ></StyledDustIcon>
          );
        case "Bad 1":
          return (
            <StyledToiletIcon
              className={props.className}
              thememode={props.thememode}
              apptheme={props.apptheme}
            ></StyledToiletIcon>
          );
        case "Bad 2":
          return (
            <StyledToiletIcon
              className={props.className}
              thememode={props.thememode}
              apptheme={props.apptheme}
            ></StyledToiletIcon>
          );
        default:
          return console.log("Hier ist ein Fehler.");
      }
    }
  };

  return (
    <TaskCircleIcon thememode={props.thememode}>
      {setSVG(props.mb.room)}
      {!props.mb.geputzt && (
        <RoomDescription
          className={props.className}
          thememode={props.thememode}
          apptheme={props.apptheme}
        >
          {roomtext}
        </RoomDescription>
      )}
      {!props.mb.geputzt && (
        <RoomDescription
          className={props.className}
          thememode={props.thememode}
          apptheme={props.apptheme}
        >
          {roomtext2}
        </RoomDescription>
      )}
    </TaskCircleIcon>
  );
}

const TaskCircleIcon = styled(CircleIcon)`
  width: 36vh;
  height: 36vh;
`;

const StyledIcon = css`
  width: 18vh;
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.headline};
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
const StyledCheckedIcon = styled(CheckedIcon)`
  ${StyledIcon}
  width: 20vh;
`;

const RoomDescription = styled.h6`
  margin-top: 20px;
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].icon.description.fontColor};
`;
