import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./components/Overview";
import MBView from "./components/MBView";
import Admin from "./components/Admin";
import NoMatch from "./components/NoMatch";
import "./App.css";

//TODO: Seite für falschgeschriebene URL
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Overview} />
          <Route path="/Admin" exact component={Admin} />
          <Route path="/:name" component={MBView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
