import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ userInfo }) => {
  const navigate=useNavigate()
  return (
    <div className="header">
      <div className="logo">
        <h1 onClick={()=>navigate('/')}>BAG-blog</h1>
      </div>
      <div className='user' onClick={()=>navigate(`users/${userInfo._id}`)}>
        <img src={userInfo.avatar}/>
      <div className='userInfo'>
        <div style={{ color: "blue", fontWeight: "600", fontSize:'14px'}}>{userInfo.name}</div>
        <div style={{color:'grey'}}>{userInfo.email}</div>
        </div>
      </div>
    </div>
  )
}
