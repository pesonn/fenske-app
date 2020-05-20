import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlotztMenu from "./GlotztMenu";

//TODO: Seite für falschgeschriebene URL
function Glotzt(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/glotzt/"
          exact
          render={(props) => (
            <GlotztMenu {...props} thememode="light" apptheme="glotzt" />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Glotzt;
