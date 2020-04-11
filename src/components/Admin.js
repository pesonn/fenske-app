import React, { useState, useEffect } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function Admin() {
  const [gif, setGif] = useState({
    data: {},
    images: {},
  });

  async function getGif(id) {
    const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_apiKey);
    const result = await gf.gif(id);
    setGif({ data: result.data, images: result.data.images.original });
  }

  useEffect(() => {
    getGif("vX9WcCiWwUF7G");
  }, []);

  return (
    <div>
      <h1 style={{ color: "black" }}>Hello Admin</h1>
      <div className="giphy-embed"></div>
      <p></p>
      <img src={gif.images.url} alt={gif.data.title} />
      {console.log(gif.data.title)}
    </div>
  );
}
