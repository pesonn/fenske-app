import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import ProviderChoice from "./ProviderChoice";
export default function AddToMovielist(props) {
  /*
  1. Eingabefeld -> eigene component
  2. eingegeben Namen per props an Providerauswahl, von da in Datenbank schieben und zurück zur Movielist Übersicht
  */

  const [moviedata, setMoviedata] = useState({
    name: "",
    showProviderChoice: false,
  });

  const handleChange = (event) => {
    setMoviedata({ ...moviedata, name: event.target.value });
  };

  const toggleProvider = () => {
    moviedata.showProviderChoice
      ? setMoviedata({ ...moviedata, showProviderChoice: false })
      : setMoviedata({ ...moviedata, showProviderChoice: true });
  };

  const resetMoviedata = () => {
    setMoviedata({ name: "", showProviderChoice: false });
  };
  return (
    <Wrapper>
      {!moviedata.showProviderChoice && (
        <WrapperForm thememode={props.thememode} apptheme={props.apptheme}>
          <StyledInput
            thememode={props.thememode}
            apptheme={props.apptheme}
            type="text"
            value={moviedata.name}
            onChange={handleChange}
            placeholder="Filmname"
          ></StyledInput>
          <StyledButton
            thememode={props.thememode}
            apptheme={props.apptheme}
            className={props.className}
            onClick={toggleProvider}
          >
            Auf die Liste
          </StyledButton>
        </WrapperForm>
      )}

      {moviedata.showProviderChoice && (
        <ProviderChoice
          thememode={props.thememode}
          apptheme={props.apptheme}
          database={props.database}
          activegameid={props.activegameid}
          moviename={moviedata.name}
          resetmoviedata={resetMoviedata}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${"" /* width: 84.49%; */}
`;

const WrapperForm = styled.form`
  position: absolute;
  bottom: 2vh;
  left: 6vh;
  width: 73vw;
  height: 5vh;
  display: flex;
  flex: column wrap;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${(props) => props.theme[props.thememode].maincolors.text};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  padding: 10px 3vw 10px 3vw;
`;

const StyledInput = styled.input`
  width: 68%;
  height: 4vh;
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  border: 0px solid ${(props) => props.theme[props.thememode].maincolors.text};
  border-radius: 0;
  box-shadow: 0 0;
  ::placeholder {
    color: ${(props) => props.theme[props.thememode].maincolors.text};
    font-family: ${(props) => props.theme.general.fontFamily.paragraph};
    font-size: ${(props) => props.theme.general.fontSizes.paragraph};
  }
`;

const StyledButton = styled(Button)`
  width: 11vh;
  height: 33px;
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
`;
