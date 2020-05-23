import React from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import styled from "styled-components";
import CircleIcon from "./CircleIcon";
import AppTitle from "./AppTitle";
import Button from "./Button";

export default function ProviderChoice(props) {
  const movieToDatabase = (moviename, provider) => {
    getFirebaseCollectionFrom(props.database)
      .doc(props.activegameid)
      .collection("movielist")
      .doc(moviename)
      .set({
        name: moviename,
        active: true,
        provider: provider,
      });
    props.resetmoviedata();
  };

  return (
    <Wrapper thememode={props.thememode} apptheme={props.apptheme}>
      <SquareIcon
        thememode={props.thememode}
        apptheme={props.apptheme}
        className={props.className}
      >
        <SmallAppTitle
          thememode={props.thememode}
          apptheme={props.apptheme}
          className={props.className}
          appdetails={{
            name: "Wo gibt's den Film?",
            description: "",
          }}
        />
        <ProviderWrapper>
          <NetflixButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Netflix")}
          >
            Netflix
          </NetflixButton>
          <AmazonButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Amazon Prime")}
          >
            Amazon Prime
          </AmazonButton>
          <DisneyButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Disney+")}
          >
            Disney+
          </DisneyButton>
          <RegalButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "DVD Regal")}
          >
            DVD Regal
          </RegalButton>
        </ProviderWrapper>
      </SquareIcon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  height: auto;
  padding-top: 6vh;
  background-color: ${(props) =>
    props.theme[props.thememode].maincolors.background};
`;

const SquareIcon = styled(CircleIcon)`
  border-radius: 0;
  width: 70vw;
  max-width: 500px;
  height: 50vh;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ProviderWrapper = styled.section`
  ${"" /* background-color: #943; */}

  width: 75%;
  height: 60%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;

const SmallAppTitle = styled(AppTitle)`
  margin: 3vh 0 5vh 3vh;
  h1 {
    font-size: ${(props) => props.theme.general.fontSizes.subline};
  }
`;

const NetflixButton = styled(Button)`
  width: 100%;
  box-shadow: 0 0;
`;

const AmazonButton = styled(NetflixButton)`
  background-color: #245feb;
`;

const DisneyButton = styled(NetflixButton)`
  background-color: #1a45ab;
`;
const RegalButton = styled(NetflixButton)`
  background-color: #918e8e;
`;
