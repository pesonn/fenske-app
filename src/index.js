import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createGlobalStyle } from "styled-components";
import { GlobalFonts } from "./fonts/GlobalFonts";

const Background = createGlobalStyle`
body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  height: 100%;
  width: 100vw;
  background: #f5f5f5;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Background />
    <GlobalFonts />
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
