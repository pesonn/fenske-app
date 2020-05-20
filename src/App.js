import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./routes/Overview";
// import MBView from "./routes/MBView";
import MBView from "./routes/MBView";
import Legals from "./routes/Legals";
// import Admin from "./routes/Admin";
import NoMatch from "./routes/NoMatch";
// import "./App.css";

import styled, { ThemeProvider } from "styled-components";

const theme = {
  general: {
    fontFamily: {
      headline: "SourceSansBold",
      subline: "SourceSansSemi",
      paragraph: "SourceSansReg",
    },
    fontSizes: {
      headline: "3.7vh",
      subheadline: "3.3vh",
      subline: "1.8vh",
      paragraph: "1.5vh",
    },
  },
  light: {
    maincolors: {
      text: "#737272",
      black: "#2C2C2C",
      white: "#F8F8F8",
    },
    indicator: {
      incomplete: "#FF9081",
      done: "#59EB3F",
    },
    icon: {
      description: {
        fontColor: "rgba(203, 203, 203, 0.98)",
        filter: "blur(0.5px)",
      },
      colors: {
        background: "#F0F0F0",
        incomplete: "#F2EDED",
        done: "#EEF2ED",
      },
    },
    putzt: {
      colors: {
        headline: "#314F9B",
        button: "#526CAC",
        buttonShadow: "rgba(82, 108, 172, 0.67);",
      },
    },
  },
};

//TODO: Seite für falschgeschriebene URL
function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Overview {...props} thememode="light" apptheme="putzt" />
            )}
          />
          {/* 

            <Route path="/" exact component={Overview} thememode={"dark"} />
          <Route path="/Admin" exact component={Admin} /> }
          <Route path="/:name" component={MBView} />
          <Route path="/Legals" exact component={Legals} />*/}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
