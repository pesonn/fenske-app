import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./Overview";
import MBView from "./MBView";
import NoMatch from "./NoMatch";

//TODO: Seite für falschgeschriebene URL
function Putzt(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/putzt/"
          exact
          render={(props) => (
            <Overview {...props} thememode="light" apptheme="putzt" />
          )}
        />
        <Route
          path="/putzt/:name"
          render={(props) => (
            <MBView {...props} thememode="light" apptheme="putzt" />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Putzt;
