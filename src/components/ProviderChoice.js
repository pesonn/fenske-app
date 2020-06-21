import React, { useContext } from "react";
import { getFirebaseCollectionFrom } from "../firebase";
import styled from "styled-components";
import CircleIcon from "./CircleIcon";
import AppTitle from "./AppTitle";
import Button from "./Button";
import { ThemeMode, AppTheme } from "../App";

export default function ProviderChoice(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);

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
    <Wrapper thememode={thememode} apptheme={apptheme}>
      <SquareIcon className={props.className}>
        <SmallAppTitle
          className={props.className}
          appdetails={{
            name: "Wo gibt's den Film?",
            description: "",
          }}
        />
        <ProviderWrapper>
          <NetflixButton
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Netflix")}
          >
            Netflix
          </NetflixButton>
          <AmazonButton
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Amazon Prime")}
          >
            Amazon Prime
          </AmazonButton>
          <DisneyButton
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Disney+")}
          >
            Disney+
          </DisneyButton>
          <SkyGoButton
            className={props.className}
            database={props.database}
            activegameid={props.activegameid}
            moviename={props.moviename}
            onClick={() => movieToDatabase(props.moviename, "Sky Go")}
          >
            Sky Go
          </SkyGoButton>
          <RegalButton
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
  width: 100vw;
  height: 100vh;
  padding-top: 0;
  background-color: ${(props) =>
    props.theme[props.thememode].maincolors.background};
`;

const SquareIcon = styled(CircleIcon)`
  border-radius: 0;
  width: 70vw;
  max-width: 500px;
  height: 50vh;
  max-height: 800px;
  margin-top: -25vh;
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
const SkyGoButton = styled(NetflixButton)`
  background: rgb(232, 122, 0);
  background: linear-gradient(
    90deg,
    rgba(232, 122, 0, 1) 0%,
    rgba(218, 4, 107, 1) 43%,
    rgba(59, 56, 131, 1) 100%
  );
`;
const RegalButton = styled(NetflixButton)`
  background-color: #918e8e;
`;
