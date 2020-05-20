import React from "react";
import Button from "../components/Button";

export default function Mainmenu(props) {
  return (
    <>
      <a href="/putzt">
        <Button
          text="Putzt"
          apptheme={"putzt"}
          thememode={props.thememode}
        ></Button>
      </a>
      <a href="/glotzt">
        <Button
          text="Glotzt"
          apptheme={"glotzt"}
          thememode={props.thememode}
        ></Button>
      </a>
    </>
  );
}
