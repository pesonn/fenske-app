import React, { useContext, useEffect } from "react";
import { UserData } from "../../App";
import { Redirect } from "react-router-dom";

export default function SetNameAfterRegistration() {
  const user = useContext(UserData);

  const chooseRedirect = () => {
    if (user !== undefined) {
      return user.name ? (
        <Redirect to="/" />
      ) : (
        <Redirect to="/Account-Settings" />
      );
    }
  };
  useEffect(() => {
    chooseRedirect();
  }, [user]);

  return <>{chooseRedirect()}</>;
}
