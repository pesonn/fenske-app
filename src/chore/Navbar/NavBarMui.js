import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeMode, AppTheme } from "../../App";
import PropTypes from "prop-types";
import { use100vh } from "react-div-100vh";
import firebase from "../../firebase";
import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { HomeIcon, MenuIcon } from "@material-ui/icons";

NavBarMui.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.exact({ title: PropTypes.string, link: PropTypes.string }),
  ).isRequired,
};

export default function NavBarMui(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  const height = use100vh();
  const navHeight = height ? (height / 100) * 7 + "px" : "7vh";
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    firebase.auth().signOut();
  };

  return (
    <footer>
      <StyledBottomNavigation showLabels component="nav" height={navHeight}>
        <StyledBottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          thememode={thememode}
          apptheme={apptheme}
        />
        <StyledBottomNavigationAction
          aria-controls="menu-overlay"
          aria-haspopup="true"
          label="Menu"
          onClick={handleClick}
          icon={<MenuIcon />}
          thememode={thememode}
          apptheme={apptheme}
        />
      </StyledBottomNavigation>
      <StyledMenu
        id="menu-overlay"
        anchorEl={anchorEl}
        onClick={handleClose}
        open={Boolean(anchorEl)}>
        {props.list.map((item) => (
          <a href={item.link}>
            <StyledMenuItem onClick={handleClose}>{item.title}</StyledMenuItem>
          </a>
        ))}
        <StyledMenuItem onClick={handleLogOut}>Ausloggen</StyledMenuItem>
      </StyledMenu>
    </footer>
  );
}

const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100vw;
  height: ${(props) => props.height};
  justify-content: space-around;
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.button};
  &:focus {
    outline: none;
  }
`;

const StyledMenu = styled(Menu)`
  &:focus {
    outline: none;
  }
  & a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  &:focus {
    outline: none;
  }
`;
