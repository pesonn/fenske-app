import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase, { getFirebaseCollectionFrom } from "../firebase";
import styled from "styled-components";
import AppTitle from "../components/AppTitle";
import Button from "../components/Button";
import { ThemeMode, AppTheme } from "../App";
import { UserData } from "../App";

export default function SetAccountSettings(props) {
  const thememode = useContext(ThemeMode);
  const apptheme = useContext(AppTheme);
  const user = useContext(UserData);
  const [userdata, setUserdata] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        if (u.email.indexOf("privaterelay.appleid.com") === -1) {
          setUserdata({
            ...userdata,
            hasAppleMail: false,
            name: u.displayName,
            email: u.email,
          });
        } else {
          setUserdata({ ...userdata, hasAppleMail: true, name: u.displayName });
        }
      } else {
        setUserdata(null);
      }
    });
  }, []);

  const handleNameChange = (event) => {
    setUserdata({ ...userdata, name: event.target.value });
  };
  const handleEmailChange = (event) => {
    setUserdata({ ...userdata, email: event.target.value });
  };

  const updateAuthenticationProfile = () => {
    if (userdata.name === null) {
      alert("Bitte gib deinen Vornamen an");
    } else {
      let currentuser = firebase.auth().currentUser;
      currentuser
        .updateProfile({
          displayName: userdata.name,
          email: userdata.email,
        })
        .then(() => {
          currentuser.reload();
        })
        .catch(console.error);

      const getOnlyFirstName = () => {
        let spaceindex = userdata.name.indexOf(" ");
        let firstname = "";
        if (spaceindex === -1) {
          firstname = userdata.name;
        } else {
          firstname = userdata.name.substring(0, spaceindex);
        }
        return firstname;
      };

      if (
        getFirebaseCollectionFrom("users")
          .doc(currentuser.uid)
          .onSnapshot((snapshot) => {
            return snapshot.data().putztID !== null;
          })
      ) {
        getFirebaseCollectionFrom("putzt-app")
          .doc(user.putztID)
          .collection("putzplan")
          .doc(currentuser.uid)
          .update({
            name: getOnlyFirstName(),
          });
      }

      getFirebaseCollectionFrom("users")
        .doc(currentuser.uid)
        .update({
          name: getOnlyFirstName(),
        })
        .then(() => {
          window.location.href = "/";
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <MenuWrapper>
        <AppTitle
          appdetails={{
            name: "Account Einstellungen",
            description: "Hier kannst du deinen Account bearbeiten:",
          }}
        />
        {userdata ? (
          <>
            <StyledLabel thememode={thememode} apptheme={apptheme}>
              Vorname
            </StyledLabel>
            <StyledInput
              thememode={thememode}
              apptheme={apptheme}
              type="text"
              value={userdata.name}
              onChange={handleNameChange}
              placeholder={userdata.name}
            ></StyledInput>
            <StyledLabel thememode={thememode} apptheme={apptheme}>
              E-Mail Adresse
            </StyledLabel>
            {userdata.hasAppleMail ? (
              <StyledNoInput thememode={thememode} apptheme={apptheme}>
                Deine E-Mail Adresse wird durch Apple gemanaged.
              </StyledNoInput>
            ) : (
              <StyledInput
                thememode={thememode}
                apptheme={apptheme}
                type="text"
                value={userdata.email}
                onChange={handleEmailChange}
                placeholder={userdata.email}
              ></StyledInput>
            )}
          </>
        ) : null}
        <Button
          className={props.className}
          type={"button"}
          onClick={updateAuthenticationProfile}
          inactive={false}
        >
          Speichern
        </Button>
      </MenuWrapper>
    </>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: left;
  justify-content: top;
  height: 65vh;
  width: 80vw;
  margin-left: 10vw;
  padding: 5vh 0 0 0;
  min-height: 350px;
`;

const StyledLabel = styled.label`
  width: 70%;
  ${"" /* height: 4vh; */}
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.subline};
  color: ${(props) => props.theme[props.thememode].maincolors.text};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  border: 0px solid ${(props) => props.theme[props.thememode].maincolors.text};
  border-radius: 0;
  box-shadow: 0 0;
`;

const StyledInput = styled.input`
  width: 70%;
  height: 3vh;
  margin-bottom: 3vh;
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
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

const StyledNoInput = styled.p`
  width: 70%;
  height: 3vh;
  margin-bottom: 3vh;
  font-family: ${(props) => props.theme.general.fontFamily.subline};
  font-size: ${(props) => props.theme.general.fontSizes.paragraph};
  background-color: ${(props) => props.theme[props.thememode].maincolors.white};
  border: 0px solid ${(props) => props.theme[props.thememode].maincolors.text};
  border-radius: 0;
  box-shadow: 0 0;
  color: ${(props) => props.theme[props.thememode].maincolors.black};
`;

const StyledButton = styled(Button)`
  ${"" /* width: 11vh;
  height: 33px; */}
  ${"" /* font-size: ${(props) => props.theme.general.fontSizes.paragraph}; */}
  ${
    "" /* color: ${(props) => props.theme[props.thememode].maincolors.black}; */
  }
`;
