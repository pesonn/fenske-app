import React from "react";
import styled from "styled-components";

export default function CircleIcon(props) {
  return (
    <Circle
      className={props.className}
      thememode={props.thememode}
      apptheme={props.apptheme}
    >
      {props.children}
    </Circle>
  );
}
const Circle = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 10vh;
  height: 10vh;
  background-color: ${(props) =>
    props.theme[props.thememode].icon.colors.background};
  border-radius: 50%;
  margin-top: 8vh;
  box-shadow: -4px -3px 7px rgba(255, 255, 255, 0.55),
    2px 3px 7px rgba(88, 88, 88, 0.25);
`;
