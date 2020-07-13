import React, { useContext, useState } from "react";
import firebase from "../firebase";
import functions from "firebase/functions";
import styled from "styled-components";
import Button from "./Button";
import { ThemeMode, AppTheme } from "../App";

export default function InputField(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  const [invite, setInvite] = useState({
    code: "",
  });

  const handleChange = (event) => {
    setInvite({ ...invite, code: event.target.value });
  };

  let sendCode = firebase.functions().httpsCallable("setPutztID");
  const sendInviteCode = () => {
    sendCode({ code: invite.code });
  };

  return (
    <>
      <WrapperForm thememode={thememode} apptheme={apptheme}>
        <StyledInput
          thememode={thememode}
          apptheme={apptheme}
          type="text"
          value={invite.code}
          onChange={handleChange}
          placeholder="Invitecode"
        ></StyledInput>
        <StyledButton className={props.className} onClick={sendInviteCode}>
          Lass mich rein!
        </StyledButton>
      </WrapperForm>
      <button onClick={sendInviteCode}>TEST</button>
    </>
  );
}

const WrapperForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 73vw;
  height: 5vh;
  display: flex;
  flex: column wrap;
  justify-content: center;
  align-items: center;

  border: 1px solid ${(props) => props.theme[props.thememode].maincolors.text};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  padding: 10px 3vw 10px 3vw;
`;

const StyledInput = styled.input`
  width: 70%;
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
