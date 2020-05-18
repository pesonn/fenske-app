import React from "react";
import styled from "styled-components";

export default function Button(props) {
  const Button = styled.button`
    width: 23vh;
    height: 5vh;
    border: 0;
    background-color: ${(props) => props.theme.putzt.colors.button};
    color: ${(props) => props.theme.main.colors.white};
    font-family: ${(props) => props.theme.main.fontFamily.subline};
    font-size: ${(props) => props.theme.main.fontSizes.subline};
    box-shadow: 0px 4px 6px ${(props) => props.theme.putzt.colors.buttonShadow};
  `;

  return <Button onClick={props.callFunction}>{props.text}</Button>;
}
