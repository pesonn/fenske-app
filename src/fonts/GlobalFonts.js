import { createGlobalStyle } from "styled-components";
import SourceSansReg from "./Source_Sans_Pro/SourceSansPro-Regular.ttf";
import SourceSansBold from "./Source_Sans_Pro/SourceSansPro-Bold.ttf";
import SourceSansSemi from "./Source_Sans_Pro/SourceSansPro-SemiBold.ttf";

export const GlobalFonts = createGlobalStyle`
 @font-face {
    font-family: "SourceSansReg";
    src: url(${SourceSansReg});
    font-weight: "normal";
  }
 @font-face {
    font-family: "SourceSansBold";
    src: url(${SourceSansBold});
    font-weight: "bold";
  }
  @font-face {
    font-family: "SourceSansSemi";
    src: url(${SourceSansSemi});
    font-weight: 600;
  } 
`;
