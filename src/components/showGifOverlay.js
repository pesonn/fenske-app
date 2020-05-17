import React from "react";

import "../App.css";
import "../styles/generals.css";
import "../styles/MBView.css";

export default function ShowGifOverlay(props) {
  props.displaygif && setTimeout(props.toggleGif, 3000);

  return (
    <div>
      {props.displaygif && (
        <img
          className="gif"
          src={props.showGif.images.url}
          alt={props.showGif.data.title}
        />
      )}
    </div>
  );
}
