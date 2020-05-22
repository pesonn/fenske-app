import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";
import Movielist from "./Movielist";

export default function GenerateMovieList(props) {
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
    <MenuWrapper>
      <Movielist
        thememode={props.thememode}
        apptheme={props.apptheme}
        movielist={movielist}
      ></Movielist>
      {console.log(movielist)}
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  height: 8vh;
  width: 80vw;
  margin-left: 10vw;
  padding: 0vh 0 0 0;
  min-height: 300px;
`;
