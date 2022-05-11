import React from "react";
import { Button } from "../Button";
import "./index.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const Greeting = () => {
  return (<div className="greetingCont">

    <div className="greeting">
      <div>
        <div style={{fontSize:'x-large',color:'red',fontWeight:'800'}}>Добро пожаловать в BAG-блог!</div>
        <div>Изучайте, развлекайтесь, создавайте, креативьте! 😃</div>
      </div>
      <div>
        
        <Button />
      
    </div>
      <IconButton className='close' onClick={()=>{document.querySelector(".greetingCont").style.display = "none"}}>
        <CloseIcon fontSize='small'/></IconButton></div>
    </div>
  );
};
