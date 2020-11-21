import React, { createContext, useEffect, useState } from "react";
import firebase, { getFirebaseCollectionFrom } from "./firebase";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Mainmenu from "./routes/Mainmenu";
import Welcome from "./routes/Welcome";
import GlotztMenu from "./routes/glotzt/GlotztMenu";
import Rausvoten from "./routes/glotzt/Rausvoten";
import Bepunktet from "./routes/glotzt/Bepunktet";
import Top100 from "./routes/glotzt/Top100";
import Overview from "./routes/putzt/Overview";
import MBView from "./routes/putzt/MBView";
import Admin from "./routes/Admin";
import JoinFormPutzt from "./routes/putzt/JoinFormPutzt";
import JoinFormGlotzt from "./routes/glotzt/JoinFormGlotzt";
import Legals from "./routes/Legals";
import SetAccountSettings from "./routes/SetAccountSettings";
import CheckAfterLogin from "./routes/CheckAfterLogin";
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
      console.log(u);
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
            {
              //Damit eine leere Seite gezeigt wird, wenn der User noch nicht komplett übergeben wurde
              // user = undefindet: nutzer ist angemeldet, aber die component hat den User noch nicht erhalten
              // user = null: es ist kein User angemeldet
            }
            {user === undefined ? null : user ? (
              <UserData.Provider value={user}>
                <AppTheme.Provider value="mainmenu">
                  <LogoutButton>Ausloggen</LogoutButton>
                </AppTheme.Provider>
                <AppTheme.Provider value="mainmenu">
                  {
                    //TODO: Falls DisplayName im auth() nicht vorhanden ist muss eine Abfrage zur manuellen Eingabe des Namens erstellt werden
                  }
                  <Route
                    path="/"
                    exact
                    render={(props) =>
                      user ? <Mainmenu {...props} /> : <Welcome {...props} />
                    }
                  />
                </AppTheme.Provider>
                <AppTheme.Provider value="putzt">
                  {
                    //TODO: Falls es die Gruppe in der Putzt-app nicht mehr gibt muss erneut auf JoinForm verwiesen werden
                  }
                  <Route
                    path="/putzt"
                    exact
                    render={(props) =>
                      user.putztID ? (
                        <Overview {...props} user={user} />
                      ) : (
                          <JoinFormPutzt {...props} user={user} app={"putzt"} />
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
                    // old: render={(props) => <Rausvoten {...props} />}
                    render={(props) =>
                      user.rausvotenActiveID ? (
                        <Rausvoten {...props} user={user} />
                      ) : (
                          <JoinFormGlotzt {...props} user={user} app={"glotzt"} />
                        )
                    }
                  />
                  <Route
                    path="/invite/rausvoten/:invitecode"
                    exact
                    render={(props) =>
                      user.rausvotenActiveID ? (
                        <Redirect exact to="/glotzt/rausvoten" />
                      ) : (
                          <JoinFormGlotzt {...props} user={user} app={"glotzt"} />
                        )
                    }
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
                <AppTheme.Provider value="mainmenu">
                  <Route
                    path="/Account-Settings"
                    exact
                    component={SetAccountSettings}
                  />
                  <Route path="/checklogin" exact component={CheckAfterLogin} />
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
