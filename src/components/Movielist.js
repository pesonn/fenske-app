import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";

export default function Movielist(props) {
  const [movielist, setMovielist] = useState([]);
  const [sortedMovielist, setSortedMovielist] = useState({
    active: [],
    inactive: [],
  });

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
  useEffect(() => {
    sortMovieList();
  }, [movielist]);

  const sortMovieList = () => {
    let sortedlist = [];

    let allactives = movielist.filter((item) => item.active === true);
    let alldeactives = movielist.filter((item) => item.active === false);
    // sortedlist.push(allactives, alldeactives);
    // sortedlist.push(alldeactives);
    console.log(sortedlist);
    setSortedMovielist({ active: allactives, inactive: alldeactives });
  };

  return (
    <ListWrapper>
      {sortedMovielist.active.map((item) => (
        <ActiveMovie thememode={props.thememode} apptheme={props.apptheme}>
          {item.name}
        </ActiveMovie>
      ))}
      {sortedMovielist.inactive.map((item) => (
        <InActiveMovie thememode={props.thememode} apptheme={props.apptheme}>
          {item.name}
        </InActiveMovie>
      ))}
      {console.log(sortedMovielist)}
    </ListWrapper>
  );
}

const ListWrapper = styled.section`
  width: 100%;
`;

const ActiveMovie = styled.h2`
  text-align: left;
  width: 100%;
  margin-bottom: 2vh;
  font-family: ${(props) => props.theme.general.fontFamily.headline};
  font-size: ${(props) =>
    props.theme[props.thememode][props.apptheme].fontSizes.list};
  color: ${(props) =>
    props.theme[props.thememode][props.apptheme].colors.headline};
`;

const InActiveMovie = styled(ActiveMovie)`
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  text-decoration: line-through;
`;
