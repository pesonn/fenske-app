import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./routes/Overview";
// import MBView from "./routes/MBView";
import MBView from "./routes/MBView";
import Legals from "./routes/Legals";
// import Admin from "./routes/Admin";
import NoMatch from "./routes/NoMatch";
import "./App.css";

import styled, { ThemeProvider } from "styled-components";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: #e5e5e5;
`;

const theme = {
  main: {
    colors: {
      text: "#737272",
      black: "#2C2C2C",
      white: "#F8F8F8",
    },
    fontFamily: {
      headline: "SourceSansBold",
      subline: "SourceSansSemi",
      paragraph: "SourceSansReg",
    },

    fontSizes: {
      headline: "4.5vh",
      subline: "1.8vh",
      paragraph: "1.4vh",
    },
  },
  putzt: {
    colors: {
      headline: "#314F9B",
      button: "#526CAC",
    },
    indicator: {
      incomplete: "#FF9081",
      done: "#5AF141",
    },
    icon: {
      description: {
        fontColor: "rgba(203, 203, 203, 0.98)",
        filter: "blur(0.5px)",
      },
      colors: {
        incomplete: "#F2EDED",
        done: "#EEF2ED",
      },
    },
  },
};

//TODO: Seite für falschgeschriebene URL
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Background className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Overview} />
            {/* <Route path="/Admin" exact component={Admin} /> */}
            <Route path="/:name" component={MBView} />
            <Route path="/Legals" exact component={Legals} />
          </Switch>
        </BrowserRouter>
      </Background>
    </ThemeProvider>
  );
}

export default App;
