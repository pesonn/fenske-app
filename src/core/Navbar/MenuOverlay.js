import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../../firebase";
import styled from "styled-components";

MenuOverlay.propTypes = {
  additionalMenuItems: PropTypes.arrayOf(
    PropTypes.exact({ title: PropTypes.string, link: PropTypes.string }),
  ),
};

export default function MenuOverlay(props) {
  return (
    <StyledMenuWrapper>
      <StyledUL>
        <StyledLI>
          <StyledA href="/">Hauptmenü</StyledA>
        </StyledLI>
        <StyledLI>
          <StyledA href="/settings/account">Account Einstellungen</StyledA>
        </StyledLI>
        {props.additionalMenuItems &&
          props.additionalMenuItems.map((item, index) => (
            <StyledLI key={index}>
              <StyledA href={item.link}>{item.title}</StyledA>
            </StyledLI>
          ))}
        <StyledLI>
          <StyledA href="#" onClick={() => firebase.auth().signOut()}>
            ausloggen
          </StyledA>
        </StyledLI>
      </StyledUL>
    </StyledMenuWrapper>
  );
}

const StyledMenuWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background: #e9e9e9;
`;

const StyledUL = styled.ul``;

const StyledLI = styled.li``;

const StyledA = styled.a``;

const StyledLogout = styled.button``;
