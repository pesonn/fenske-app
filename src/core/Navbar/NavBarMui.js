import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home as HomeIcon, Menu as MenuIcon } from "@material-ui/icons";
import { ThemeMode } from "../../App";
import MenuOverlay from "./MenuOverlay";

export default function NavBarMui(props) {
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const thememode = useContext(ThemeMode);
  let appthememode = "mainmenu";

  let putztMenuItems = [
    {
      title: "Putzplan Einstellungen",
      link: "/putzt",
    },
  ];

  let glotztMenuItems = [
    {
      title: "Glotzt Einstellungen",
      link: "/glotzt",
    },
  ];

  const toggleMenuOverlay = () => {
    showMenuOverlay ? setShowMenuOverlay(false) : setShowMenuOverlay(true);
  };

  let pathname = window.location.pathname;
  let additionalMenuItems = [];
  const setAppSpecificMenu = () => {
    if (pathname.includes("/putzt")) {
      additionalMenuItems = putztMenuItems;
      appthememode = "putzt";
    } else if (pathname.includes("/glotzt")) {
      additionalMenuItems = glotztMenuItems;
      appthememode = "glotzt";
    }
  };

  setAppSpecificMenu();

  return (
    <Layout showMenuOverlay={showMenuOverlay}>
      {showMenuOverlay && (
        <MenuOverlay additionalMenuItems={additionalMenuItems} />
      )}
      {console.log(pathname)}
      {console.log(thememode)}
      <StyledFooter>
        <StyledBottomNavigation showLabels component="nav">
          <StyledBottomNavigationAction
            thememode={thememode}
            appthememode={appthememode}
            // label="Home"
            icon={<HomeIcon />}
          />
          {props.children}
          <StyledBottomNavigationAction
            thememode={thememode}
            appthememode={appthememode}
            aria-haspopup="true"
            // label="Menu"
            onClick={toggleMenuOverlay}
            icon={<MenuIcon />}
          />
        </StyledBottomNavigation>
      </StyledFooter>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  ${(props) =>
    props.showMenuOverlay &&
    `
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
  `}
`;
const StyledFooter = styled.footer`
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  width: 100%;
`;

const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
  height: 50px;
  justify-content: space-around;
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  color: ${(props) =>
    props.theme[props.thememode][props.appthememode].colors.button};
  &:focus {
    outline: none;
  }
`;
