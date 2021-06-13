import React from "react";
import PropTypes from "prop-types";
import AppTitle from "../../../components/AppTitle";
import Navbar from "../../../core/Navbar";

Settings.propTypes = {};

export default function Settings(props) {
  return (
    <>
      <AppTitle
        appdetails={{
          name: "Putzplan Einstellungen",
          description: "Hier kannst du alles zu eurem Putplan einstellen!",
        }}
      />
      <Navbar value="" />
    </>
  );
}
