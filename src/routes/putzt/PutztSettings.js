import React from "react";
import PropTypes from "prop-types";
import AppTitle from "../../components/AppTitle";

PutztSettings.propTypes = {};

export default function PutztSettings(props) {
  return (
    <>
      <AppTitle
        appdetails={{
          title: "Putzplan Einstellungen",
          description: "Hier kannst du alles zu eurem Putplan einstellen!",
        }}
      />
    </>
  );
}
