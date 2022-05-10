import {createGlobalStyle} from "styled-components"
export const darkTheme = {
    body: "rgba(000, 000, 000, 0.95)" ,
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
   .header button{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }
   .links button{
    background: ${props => props.theme.body};
    color: ${props => props.theme.body};
    transition: .3s ease; 
   }
   .buttonBlock button{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }
   .create input{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }
   .create button{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; }

    .createButton{
      background: ${props => props.theme.body};
      color: ${props => props.theme.textColor};
      transition: .3s ease; 
   }
   .edit input{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }
   card{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }
   .header input{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
   }

  .createBut{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
  }
.user{
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease; 
  }
   `