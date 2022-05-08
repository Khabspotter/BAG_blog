import React from 'react';
import './index.css'
import { useNavigate } from "react-router-dom";


export const Button = () => {
  const navigate = useNavigate();
  return (
    <button  className='createButton' onClick={()=>{navigate('create')}}>Создать пост</button>
  )
}
