import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ userInfo }) => {
  const navigate=useNavigate()
  return (
    <div className="header">
      <div className="logo">
        <h1 onClick={()=>navigate('/')}>Rettiwt</h1>
      </div>
      <div className="links">
        <button onClick={()=>navigate('/')}>Home</button>
        <button>Rettiwt Docs</button>
        <a href="https://github.com/Khabspotter/" target="_blank">
          <button>GitHub</button>
        </a>
      </div>
      <div style={{ lineHeight: "0%", cursor:'pointer'}}>
        <p style={{ color: "blue", fontWeight: "600", fontSize:'18px'}}>{userInfo.name}</p>
        <p style={{color:'grey'}}>{userInfo.email}</p>
        <p>{userInfo.about}</p>
      </div>
    </div>
  );
};
