import React from "react";
import styled from "styled-components";

export default function CircleIcon(props) {
  const thememode = "light";
  const apptheme = "";

  let size = props.sizeinVH;
  const Circle = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: ${size}vh;
    height: ${size}vh;
    background-color: ${(props) =>
      props.theme[thememode].icon.colors.background};
    border-radius: 50%;
    margin-top: 8vh;
    box-shadow: -4px -3px 7px rgba(255, 255, 255, 0.55),
      2px 3px 7px rgba(88, 88, 88, 0.25);
  `;

  return <Circle>{props.children}</Circle>;
}
