import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { ThemeMode, AppTheme } from "../../App";
import Button from "./Button";
import { BsHouse } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

NavBar.propTypes = {};

export default function NavBar(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);

  const [showOverlay, setShowOverlay] = useState(false);

  const changeOverlay = () => {
    showOverlay ? setShowOverlay(false) : setShowOverlay(true);
  };
  return (
    <StyledFooter className={props.className}>
      <StyledNav>
        <Button
          icon={
            <StyledHouse thememode={thememode} apptheme={apptheme} size="50%" />
          }
        />
        <Button
          icon={
            // <StyledMenuIcon thememode={thememode} apptheme={apptheme} size="50%" />
            "hello"
          }
          onClick={changeOverlay}
        />
      </StyledNav>
      {showOverlay && (
        <StyledOverlay
          list={[
            { title: "hello", link: "#" },
            { title: "Settings", link: "#" },
          ]}
          showOverlay={showOverlay}
        />
      )}
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100vw;
  ${(props) =>
    props.showOverlay &&
    styled.css`
      position: absolute;
      top: 20vh;
    `};
`;

const StyledNav = styled.nav`
  width: 100%;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledOverlay = styled.aside`
  height: 80vh;
  transition: height 250ms;
`;

const StyledHouse = styled(BsHouse)`
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.button};
  text-align: center;
`;
const StyledMenuIcon = styled(BiMenu)`
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.button};
  text-align: center;
`;
