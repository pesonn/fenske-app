import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeMode, AppTheme } from "../../App";
import PropTypes from "prop-types";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home as HomeIcon, Menu as MenuIcon } from "@material-ui/icons";
import MenuOverlay from "./MenuOverlay";

NavBarMui.propTypes = {
  additionalMenuItems: PropTypes.arrayOf(
    PropTypes.shape(MenuOverlay.propTypes),
  ),
  additionalNavItem: PropTypes.elementType,
};

export default function NavBarMui(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);

  const [showMenuOverlay, setShowMenuOverlay] = useState(false);

  const toggleMenuOverlay = () => {
    showMenuOverlay ? setShowMenuOverlay(false) : setShowMenuOverlay(true);
  };

  return (
    <>
      {showMenuOverlay && (
        <MenuOverlay additionalMenuItems={props.additionalMenuItems} />
      )}
      <StyledFooter>
        <StyledBottomNavigation showLabels component="nav">
          <StyledBottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            thememode={thememode}
            apptheme={apptheme}
          />
          {props.children}
          <StyledBottomNavigationAction
            aria-haspopup="true"
            label="Menu"
            onClick={toggleMenuOverlay}
            icon={<MenuIcon />}
            thememode={thememode}
            apptheme={apptheme}
          />
        </StyledBottomNavigation>
      </StyledFooter>
    </>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
  height: 50px;
  justify-content: space-around;
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.button};
  &:focus {
    outline: none;
  }
`;
