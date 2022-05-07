import React from 'react';
import {Button} from '../Button';
import './index.css'

export const Greeting = ({switchTheme}) => {
  return (
    <div className='greeting'>
    <div>
      <h2>Welcome to Our Image Board!</h2>
      <p>We're stoked that you're here.😃</p>
    </div>
    <div>
      <Button />
      <button className='createButton'  onClick={switchTheme}>Switch Theme</button>
    </div>
    </div>
  )
}
