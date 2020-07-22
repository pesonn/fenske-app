import React, { useContext, useEffect } from "react";
import { UserData } from "../App";
import { Redirect } from "react-router-dom";
import FirstSignInOverlay from "../components/FirstSignInOverlay";

export default function SetNameAfterRegistration(props) {
  const user = useContext(UserData);

  const chooseRedirect = () => {
    if (user !== undefined) {
      return user.name ? (
        <Redirect to="/" />
      ) : user.hasSignedInOnce ? (
        <Redirect to="/Account-Settings" />
      ) : (
        <FirstSignInOverlay />
      );
    }
  };
  useEffect(() => {
    chooseRedirect();
  }, [user]);

  return <>{chooseRedirect()}</>;
}
