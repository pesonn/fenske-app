import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CheckedIcon } from "../svg-icons/checked.svg";

export default function Indicator(props) {
  const switchRoomNames = (room) => {
    if (props.mb.geputzt) {
      return (
        <StyledCheckedIcon
          thememode={props.thememode}
          apptheme={props.apptheme}></StyledCheckedIcon>
      );
    } else {
      switch (room) {
        case "Bad 1":
          return "Bad";
        case "Bad 2":
          return "Bad";
        case "Wohnen":
          return room;
        default:
          return room;
      }
    }
  };
  return (
    <ButtonIndicator
      thememode={props.thememode}
      apptheme={props.apptheme}
      mb={props.mb}>
      {switchRoomNames(props.mb.room)}
      {props.mb.room === "Wohnen" && (
        <StyledSmallHint thememode={props.thememode} apptheme={props.apptheme}>
          + Müll
        </StyledSmallHint>
      )}
    </ButtonIndicator>
  );
}

// let mb = props.mb;
const ButtonIndicator = styled.button`
  background-color: ${(props) =>
    props.mb.geputzt
      ? props.theme[props.thememode].indicator.done
      : props.theme[props.thememode].indicator.incomplete};
  width: 15vh;
  height: 5.5vh;
  border: 0;
  box-shadow: 0px 1px 10px
    ${(props) =>
      props.mb.geputzt
        ? props.theme[props.thememode].indicator.done
        : props.theme[props.thememode].indicator.incomplete};
  border-radius: 20px;
  color: ${(props) => props.theme[props.thememode].maincolors.white};
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: 2.5vh;
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  margin-top: 0.5vh;
  width: 5.5vh;
  color: ${(props) => props.theme[props.thememode].maincolors.white};
`;

const StyledSmallHint = styled.small`
  display: block;
  font-size: ${(props) => props.theme.general.fontSizes.smallButton};
`;
