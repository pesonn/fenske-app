import React from "react";
import { Link } from "react-router-dom";
import Emoji from "a11y-react-emoji";
import styled from "styled-components";
import Indicator from "./Indicator";

export default function OverviewName(props) {
  const Name = styled.h1`
    text-align: left;
    ${"" /* max-width: 900px;
  min-width: 300px; */} 
    font-family: ${(props) => props.theme.main.fontFamily.headline};
    font-size: ${(props) => props.theme.main.fontSizes.headline};
    color: ${(props) => props.theme.main.colors.black};
  `;

  const LinkStyled = styled(Link)`
    ${"" /* margin: 0 10% 0 10%; */}
    width: 100%;
    height: max-content;

    ${"" /*  & .emoji {
      font-size: 5vh;
      margin: 0 0 0 15px;
    } */}
  `;

  return (
    <LinkStyled
      to={{
        pathname: `/${props.item.name || props.item.name.toLowerCase()}`,
        state: {
          data: "test",
        },
      }}
    >
      <Name key={props.item.id} className="Name">
        {props.item.name}{" "}
        {/*  {props.item.geputzt ? (
          <Emoji className="emoji" symbol="✅" />
        ) : (
          <Emoji className="emoji" symbol="❌" />
        )} */}
      </Name>
      <Indicator mb={props.item} />
    </LinkStyled>
  );
}
