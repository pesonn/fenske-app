import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";
import StyledButton from "./Button";

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

  const toggle

  return (
    <ListWrapper>
      {sortedMovielist.active.map((item) => (
        <ListRow>
          <ActiveMovie thememode={props.thememode} apptheme={props.apptheme}>
            {item.name}
          </ActiveMovie>
          <ListButton thememode={props.thememode} apptheme={props.apptheme}>
            Raus damit!
          </ListButton>
        </ListRow>
      ))}
      {sortedMovielist.inactive.map((item) => (
        <ListRow>
          <InActiveMovie thememode={props.thememode} apptheme={props.apptheme}>
            {item.name}
          </InActiveMovie>
          <ListButton thememode={props.thememode} apptheme={props.apptheme}>
            Raus damit!
          </ListButton>
        </ListRow>
      ))}
      {console.log(sortedMovielist)}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 100%;
`;

const ListRow = styled.section`
  width: 100%;
  margin-bottom: 2vh;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const ActiveMovie = styled.h2`
  text-align: left;
  width: 100%;
  margin-right: 2vh;
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

const ListButton = styled(StyledButton)`
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  width: 18vh;
  height: 4vh;
`;
