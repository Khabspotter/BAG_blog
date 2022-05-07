import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null)
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
      api
        .getPosts(params.postID)
        .then((data) => {
          setUserInfo(data)
        })
        .catch((err) => alert(err));
    }, []);


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
          Информация об авторе: 
        </Typography> 
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
          Имя автора: {userInfo?.author.name}
        </Typography> 
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
          Аватар: <img style={{width:600}} src={userInfo?.author.avatar}/>
        </Typography> 
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
          Род деятельности: {userInfo?.author.about}
        </Typography> 
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
          Электронная почта: {userInfo?.author.email}
        </Typography> 
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
            <button onClick={()=>navigate(`/posts/${params.postID}`)}>
              <div><ArrowBackIcon/></div> <div>Вернуться к посту</div>
            </button>
            <button onClick={()=>navigate('/')}>
              <div><HomeIcon/></div> <div>На главную</div>
            </button>
        </Typography> 
      </CardContent>
    </Card>  
  )
}
            


