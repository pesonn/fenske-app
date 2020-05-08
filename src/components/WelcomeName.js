import React from "react";
import { Redirect } from "react-router-dom";

export default function WelcomeName(props) {
  return (
    <div className="mb_wrapper">
      {console.log(props.mb)}
      <div className="mbview ">
        <h1 className="mbview__title">
          Moin{" "}
          {typeof props.mb === "undefined" ? (
            <Redirect to="/" />
          ) : (
            props.mb.name
          )}
          !
        </h1>
      </div>
    </div>
  );
}
