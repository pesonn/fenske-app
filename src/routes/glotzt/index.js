import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlotztMenu from "./GlotztMenu";
import Rausvoten from "./Rausvoten";
import Bepunktet from "./Bepunktet";
import Top100 from "./Top100";

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
        <Route
          path="/glotzt/rausvoten"
          exact
          render={(props) => (
            <Rausvoten {...props} thememode="light" apptheme="glotzt" />
          )}
        />
        <Route
          path="/glotzt/bepunktet"
          exact
          render={(props) => (
            <Bepunktet {...props} thememode="light" apptheme="glotzt" />
          )}
        />
        <Route
          path="/glotzt/top100"
          exact
          render={(props) => (
            <Top100 {...props} thememode="light" apptheme="glotzt" />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Glotzt;
