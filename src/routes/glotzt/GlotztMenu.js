import React from "react";
import Button from "../../components/Button";

export default function GlotztMenu(props) {
  return (
    <>
      <a href="/rausvoten">
        <Button
          thememode={props.thememode}
          apptheme={props.apptheme}
          text="Rausvoten"
        ></Button>
      </a>
      <a href="/bepunktet">
        <Button
          thememode={props.thememode}
          apptheme={props.apptheme}
          text="Bepunktet"
        ></Button>
      </a>
      <a href="/top100">
        <Button
          thememode={props.thememode}
          apptheme={props.apptheme}
          text="Top 100 Poster"
        ></Button>
      </a>
    </>
  );
}
