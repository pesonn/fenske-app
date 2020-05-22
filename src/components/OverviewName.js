import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Indicator from "./Indicator";

export default function OverviewName(props) {
  const thememode = props.thememode;
  const apptheme = props.apptheme;

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
    font-family: ${(props) => props.theme.general.fontFamily.headline};
    font-size: ${(props) => props.theme.general.fontSizes.subheadline};
    color: ${(props) => props.theme[thememode][apptheme].colors.headline};
  `;

  return (
    <LinkStyled
      to={{
        pathname: `/putzt/${props.item.name || props.item.name.toLowerCase()}`,
        state: {
          data: "test",
        },
      }}
    >
      <Name key={props.item.id} className="Name">
        {props.item.name}
      </Name>
      <Indicator
        mb={props.item}
        thememode={props.thememode}
        apptheme={props.apptheme}
      />
    </LinkStyled>
  );
}
