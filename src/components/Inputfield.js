import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";

export default function Inputfield(props) {
  const [input, setInput] = useState({
    name: "",
  });

  const handleChange = (event) => {
    setInput({ name: event.target.value });
  };

  const chooseProvider = () => {};

  return (
    <WrapperForm thememode={props.thememode} apptheme={props.apptheme}>
      <StyledInput
        thememode={props.thememode}
        apptheme={props.apptheme}
        type="text"
        value={input.Name}
        onChange={handleChange}
        placeholder="Filmname"
      ></StyledInput>
      <StyledButton
        thememode={props.thememode}
        apptheme={props.apptheme}
        className={props.className}
        onClick={chooseProvider}
      >
        Auf die Liste
      </StyledButton>
    </WrapperForm>
  );
}

const WrapperForm = styled.form`
  width: 80vw;
  display: flex;
  flex: wrap;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme[props.thememode].maincolors.text};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  padding: 10px 8vw 10px 8vw;
`;

const StyledInput = styled.input`
  width: 60%;
  height: 35px;
  font-family: ${(props) => props.theme.general.fontFamily.paragraph};
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  border: 0px solid ${(props) => props.theme[props.thememode].maincolors.text};
  border-radius: 0;
  box-shadow: 0 0;
  ::placeholder {
    color: ${(props) => props.theme[props.thememode].maincolors.text};
  }
`;

const StyledButton = styled(Button)`
  width: 11vh;
  height: 33px;
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
`;

// const InputField = styled.
