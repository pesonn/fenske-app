import React, { createContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mainmenu from "./routes/Mainmenu";
import GlotztMenu from "./routes/glotzt/GlotztMenu";
import Rausvoten from "./routes/glotzt/Rausvoten";
import Bepunktet from "./routes/glotzt/Bepunktet";
import Top100 from "./routes/glotzt/Top100";
import Overview from "./routes/putzt/Overview";
import MBView from "./routes/putzt/MBView";
import Admin from "./routes/Admin";
import Legals from "./routes/Legals";
import "./index.css";
import "./App.css";
import { ThemeProvider } from "styled-components";

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
    mainmenu: {
      colors: {
        headline: "#2C2C2C",
      },
    },
    maincolors: {
      text: "#737272",
      black: "#2C2C2C",
      white: "#F8F8F8",
      background: "#f5f5f5",
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
    glotzt: {
      colors: {
        headline: "#D64038",
        button: "#E0483A",
        buttonShadow: "rgba(224, 72, 58, 0.67);",
      },
      fontSizes: {
        list: "2.5vh",
      },
    },
  },
};

export const ThemeMode = createContext();
export const AppTheme = createContext();

//TODO: Seite für falschgeschriebene URL
function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <ThemeMode.Provider value="light">
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Mainmenu {...props} thememode="light" />}
            />
            <AppTheme.Provider value="putzt">
              <Route
                path="/putzt"
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
            </AppTheme.Provider>
            {/* <AppTheme.Provider value="glotzt"> */}
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
            {/* </AppTheme.Provider> */}
            {/* <AppTheme.Provider value="glotzt"> */}
            <Route
              path="/Admin"
              exact
              render={(props) => (
                <Admin {...props} thememode="light" apptheme="glotzt" />
              )}
            />
            {/* </AppTheme.Provider> */}
            <Route path="/Legals" exact component={Legals} />
          </Switch>
        </BrowserRouter>
      </ThemeMode.Provider>
    </ThemeProvider>
  );
}

export default App;
