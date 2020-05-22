import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";

export default function Movielist(props) {
  const [movielist, setMovielist] = useState([]);

  const getMovieList = () => {
    getFirebaseCollectionFrom(props.database).onSnapshot((snapshot) => {
      const dbdata = [];
      let activeGame = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        dbdata.push(data);
        activeGame = dbdata.find((item) => item.active === true);
      });
      setMovielist(activeGame.movielist);
    });
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      {movielist.map((item) => (
        <MovieName thememode={props.thememode} apptheme={props.apptheme}>
          {item.name}
        </MovieName>
      ))}
    </>
  );
}

const MovieName = styled.h1`
text-align: left;
${"" /* max-width: 900px;
min-width: 300px; */} 
font-family: ${(props) => props.theme.general.fontFamily.headline};
font-size: ${(props) => props.theme.general.fontSizes.subheadline};
color: ${(props) =>
  props.theme[props.thememode][props.apptheme].colors.headline};
`;
