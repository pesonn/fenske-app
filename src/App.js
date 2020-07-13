import React, { createContext, useEffect, useState } from "react";
import firebase, { getFirebaseCollectionFrom } from "./firebase";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mainmenu from "./routes/Mainmenu";
import Welcome from "./routes/Welcome";
import GlotztMenu from "./routes/glotzt/GlotztMenu";
import Rausvoten from "./routes/glotzt/Rausvoten";
import Bepunktet from "./routes/glotzt/Bepunktet";
import Top100 from "./routes/glotzt/Top100";
import Overview from "./routes/putzt/Overview";
import MBView from "./routes/putzt/MBView";
import Admin from "./routes/Admin";
import JoinForm from "./routes/JoinForm";
import Legals from "./routes/Legals";
import "./index.css";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./style/theme";
import { GlobalFonts } from "./fonts/GlobalFonts";
import { createGlobalStyle } from "styled-components";
import LogoutButton from "./components/LogoutButton";

let theme = lightTheme;
let thememode = "light";

/* window.matchMedia &&
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      theme = e.matches ? darkTheme : lightTheme;
      thememode = e.matches ? "dark" : "light";
      console.log("Theme Changed");
    });

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  theme = darkTheme;
  thememode = "dark";
} else {
  theme = lightTheme;
  thememode = "light";
} */

const Background = createGlobalStyle`
body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  
  width: 100vw;
  ${"" /* background: #f7f7f7; */}
  background: ${(props) => props.theme[thememode].maincolors.background};
}
`;

export const ThemeMode = createContext();
export const AppTheme = createContext();
export const UserData = createContext();

//TODO: Seite für falschgeschriebene URL
function App(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        getFirebaseCollectionFrom("users")
          .doc(u.uid)
          .onSnapshot((usersnapshot) => {
            setUser({
              userid: u.uid,
              ...usersnapshot.data(),
            });
          });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalFonts />
      <BrowserRouter>
        <Switch>
          <ThemeMode.Provider value={thememode}>
            <Background />
            {user ? (
              <UserData.Provider value={user}>
                <AppTheme.Provider value="mainmenu">
                  <LogoutButton>Ausloggen</LogoutButton>
                </AppTheme.Provider>
                <AppTheme.Provider value="mainmenu">
                  <Route
                    path="/"
                    exact
                    render={(props) =>
                      user ? <Mainmenu {...props} /> : <Welcome {...props} />
                    }
                  />
                </AppTheme.Provider>
                <AppTheme.Provider value="putzt">
                  <Route
                    path="/putzt"
                    exact
                    render={(props) =>
                      user.putztID ? (
                        <Overview {...props} user={user} />
                      ) : (
                        <JoinForm {...props} user={user} app={"putzt"} />
                      )
                    }
                  />

                  <Route
                    path="/putzt/:name"
                    render={(props) => <MBView {...props} />}
                  />
                </AppTheme.Provider>
                <AppTheme.Provider value="glotzt">
                  <Route
                    path="/glotzt"
                    exact
                    render={(props) => <GlotztMenu {...props} />}
                  />

                  <Route
                    path="/glotzt/rausvoten"
                    exact
                    render={(props) => <Rausvoten {...props} />}
                  />

                  <Route
                    path="/glotzt/bepunktet"
                    exact
                    render={(props) => <Bepunktet {...props} />}
                  />

                  <Route
                    path="/glotzt/top100"
                    exact
                    render={(props) => <Top100 {...props} />}
                  />
                  <Route
                    path="/Admin"
                    exact
                    render={(props) => (
                      <Admin {...props} thememode="light" apptheme="glotzt" />
                    )}
                  />
                </AppTheme.Provider>
              </UserData.Provider>
            ) : (
              <AppTheme.Provider value="mainmenu">
                <Welcome {...props} />
              </AppTheme.Provider>
            )}
            <Route path="/Legals" exact component={Legals} />
          </ThemeMode.Provider>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
