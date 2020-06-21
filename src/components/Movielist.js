import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirebaseCollectionFrom } from "../firebase";
import firebase, { FieldValue } from "firebase/app";
import StyledButton from "./Button";

export default function Movielist(props) {
  const [movielist, setMovielist] = useState([]);
  const [gameData, setGameData] = useState({});
  const [sortedMovielist, setSortedMovielist] = useState({
    active: [],
    inactive: [],
  });

  const getMovieList = () => {
    props.activegameid !== "" &&
      getFirebaseCollectionFrom(props.database)
        .doc(props.activegameid)
        .collection("movielist")
        .onSnapshot((snapshot) => {
          const dbdata = [];
          let dbid = "";

          snapshot.forEach((doc) => {
            const data = doc.data();
            dbid = doc.id;
            dbdata.push({ ...data, dbid: dbid });
          });
          setMovielist(dbdata);
        });
  };

  useEffect(() => {
    getMovieList();
  }, [props.activegameid]);
  useEffect(() => {
    sortMovieList();
  }, [movielist]);

  const sortMovieList = () => {
    let allactives = movielist.filter((item) => item.active === true);
    let alldeactives = movielist.filter((item) => item.active === false);

    setSortedMovielist({ active: allactives, inactive: alldeactives });
  };

  const inActivateMovie = (moviename) => {
    getFirebaseCollectionFrom(props.database)
      .doc(props.activegameid)
      .collection("movielist")
      .doc(moviename)
      .update({
        active: false,
      });
  };
  const activateMovie = (moviename) => {
    getFirebaseCollectionFrom(props.database)
      .doc(props.activegameid)
      .collection("movielist")
      .doc(moviename)
      .update({
        active: true,
      });
  };

  const deleteMovie = (moviename) => {
    getFirebaseCollectionFrom(props.database)
      .doc(props.activegameid)
      .collection("movielist")
      .doc(moviename)
      .delete();
  };

  return (
    <ListWrapper>
      {sortedMovielist.active.map((item) => (
        <ListRow>
          <ActiveMovie thememode={props.thememode} apptheme={props.apptheme}>
            {item.name}
          </ActiveMovie>
          {props.showtogglebuttons && (
            <ActivateButton
              thememode={props.thememode}
              apptheme={props.apptheme}
              onClick={() => {
                inActivateMovie(item.name);
              }}
            >
              Raus damit!
            </ActivateButton>
          )}
          {props.showdeletebutton && (
            <DeleteButton
              thememode={props.thememode}
              apptheme={props.apptheme}
              onClick={() => {
                deleteMovie(item.name);
              }}
            >
              Löschen
            </DeleteButton>
          )}
        </ListRow>
      ))}
      {sortedMovielist.inactive.map((item) => (
        <ListRow>
          <InActiveMovie thememode={props.thememode} apptheme={props.apptheme}>
            {item.name}
          </InActiveMovie>
          {props.showtogglebuttons && (
            <InactiveButton
              thememode={props.thememode}
              apptheme={props.apptheme}
              onClick={() => {
                activateMovie(item.name);
              }}
            >
              zurück
            </InactiveButton>
          )}
        </ListRow>
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ListRow = styled.section`
  width: 100%;
  margin-bottom: 2vh;
  display: flex;
  flex-wrap: nowrap;
  align-items: space-between;
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

const ActivateButton = styled(StyledButton)`
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  width: 18vh;
  height: 4vh;
`;

const InactiveButton = styled(ActivateButton)`
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  border: 2px solid ${(props) => props.theme[props.thememode].maincolors.text};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  box-shadow: 0 0;
`;

const DeleteButton = styled(ActivateButton)`
  width: 9vh;
  height: 3vh;
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  border: 2px solid ${(props) => props.theme[props.thememode].maincolors.text};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  box-shadow: 0 0;
`;
