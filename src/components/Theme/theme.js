import {createGlobalStyle} from "styled-components"
export const darkTheme = {
    body: "#000",
    textColor: "#fff",
    headingColor: "#d23669",
    
  }
  
  export const lightTheme = {
    body: "#fff",
    textColor: "#000",
    headingColor: "#d23669"
  }
  
  export const GlobalStyles = createGlobalStyle`
   body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease;
   }
   h2{
     color: ${props => props.theme.headingColor};
   }
   .createButton{
    background: ${props => props.theme.body};
    color: black;
    transition: .3s ease; 
   }
   .links button{
    background: ${props => props.theme.body};
    color: ${props => props.theme.body};
    transition: .3s ease; 
   }
   .user {
    background: ${props => props.theme.body};
    transition: .3s ease; 
   }
   .buttonBlock button{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }
   `