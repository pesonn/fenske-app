import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Indicator from "./Indicator";

export default function OverviewName(props) {
  const LinkStyled = styled(Link)`
    width: 100%;
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  `;
  const Name = styled.h1`
    text-align: left;
    ${"" /* max-width: 900px;
  min-width: 300px; */} 
    font-family: ${(props) => props.theme.main.fontFamily.headline};
    font-size: ${(props) => props.theme.main.fontSizes.headline};
    color: ${(props) => props.theme.main.colors.black};
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
        {props.item.name}
      </Name>
      <Indicator mb={props.item} />
    </LinkStyled>
  );
}
