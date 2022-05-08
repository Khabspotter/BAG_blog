import React from 'react';
import {Button} from '../Button';
import './index.css'

export const Greeting = ({switchTheme}) => {
  return (
    <div className='greeting'>
    <div>
      <h2>Добро пожаловать в BAG-блог!</h2>
      <p>Изучайте, развлекайтесь, создавайте, креативьте! 😃</p>
    </div>
    <div>
      <Button />
      <button className='createButton'  onClick={switchTheme}>Сменить тему</button>
    </div>
    </div>
  )
}
