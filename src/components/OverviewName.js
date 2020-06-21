import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Indicator from "./Indicator";
import { ThemeMode, AppTheme } from "../App";

export default function OverviewName(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  return (
    <LinkStyled
      to={{
        pathname: `/putzt/${props.item.name || props.item.name.toLowerCase()}`,
        state: {
          data: "test",
        },
      }}
    >
      <Name key={props.item.id} thememode={thememode} apptheme={apptheme}>
        {props.item.name}
      </Name>
      <Indicator mb={props.item} thememode={thememode} apptheme={apptheme} />
    </LinkStyled>
  );
}

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
color: ${(props) =>
  props.theme[props.thememode][props.apptheme].colors.headline};
`;
