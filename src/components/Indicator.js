import React from "react";
import styled from "styled-components";
import { ReactComponent as CheckedIcon } from "../svg-icons/checked.svg";

export default function Indicator(props) {
  // to use the props inside the styled component it as to be stored inside a variable
  let mb = props.mb;
  const ButtonIndicator = styled.button`
    background-color: ${(props) =>
      mb.geputzt
        ? props.theme.putzt.indicator.done
        : props.theme.putzt.indicator.incomplete};
    width: 15vh;
    height: 5.5vh;
    border: 0;
    box-shadow: 0px 1px 10px
      ${(props) =>
        mb.geputzt
          ? props.theme.putzt.indicator.done
          : props.theme.putzt.indicator.incomplete};
    border-radius: 20px;
    color: ${(props) => props.theme.main.colors.white};
    font-family: ${(props) => props.theme.main.fontFamily.subline};
    font-size: 2.5vh;
  `;

  const StyledCheckedIcon = styled(CheckedIcon)`
    margin-top: 0.5vh;
    width: 5.5vh;
    color: ${(props) => props.theme.main.colors.white};
  `;
  const switchRoomNames = (room) => {
    if (props.mb.geputzt) {
      return <StyledCheckedIcon></StyledCheckedIcon>;
    } else {
      switch (room) {
        case "Bad 1":
          return "Bad";
        case "Bad 2":
          return "Bad";
        default:
          return room;
      }
    }
  };
  return <ButtonIndicator>{switchRoomNames(props.mb.room)}</ButtonIndicator>;
}
