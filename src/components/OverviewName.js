import React from "react";
import { Link } from "react-router-dom";
import Emoji from "a11y-react-emoji";
import styled from "styled-components";

export default function OverviewName(props) {
  const Name = styled.h1`
    margin: 0 10% 0 10%;
    width: 80%;
    max-width: 900px;
    min-width: 300px;
    & a {
      font-family: ${(props) => props.theme.main.fontFamily};
      font-size: ${(props) => props.theme.main.fontSizes.headline};
      color: ${(props) => props.theme.main.colors.black};
    }
    & .emoji {
      font-size: 5vh;
      margin: 0 0 0 15px;
    }
  `;

  return (
    <Name key={props.item.id} className="Name">
      <Link
        to={{
          pathname: `/${props.item.name || props.item.name.toLowerCase()}`,
          state: {
            data: "test",
          },
        }}
      >
        {props.item.name}{" "}
        {props.item.geputzt ? (
          <Emoji className="emoji" symbol="✅" />
        ) : (
          <Emoji className="emoji" symbol="❌" />
        )}
      </Link>
    </Name>
  );
}
