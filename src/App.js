import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./routes/Overview";
// import MBView from "./routes/MBView";
import MBView from "./routes/MBView";
import Legals from "./routes/Legals";
// import Admin from "./routes/Admin";
import NoMatch from "./routes/NoMatch";
import "./App.css";

//TODO: Seite für falschgeschriebene URL
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Overview} />
          {/* <Route path="/Admin" exact component={Admin} /> */}
          <Route path="/Legals" exact component={Legals} />
          <Route path="/:name" component={MBView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
