import React, { useEffect, useState, useContext } from 'react';
import api from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField, Button, Typography } from '@mui/material';
import PostContext from '../Contexts/postContext';



export const EditPost = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { posts, setPosts } = useContext(PostContext)

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');


    const handleClick = () => {
        api.editPosts(params.postID, {
            image,
            title,
            text,
        })
            .then((data) => {
                setPosts((prevState) => {
                    return [data, ...prevState]
                })
                navigate('/')
            })
            .catch((err) => alert(err))
    }


    useEffect(() => {
        api.getPosts(params.postID).then((data) => {
            setImage(data.image)
            setTitle(data.title)
            setText(data.text)

        })
    }, [])










    return (
        <Grid container flexDirection='column' spacing='10'>
            <Grid item>
                <Typography variant='h3'>Редактировать пост </Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Ссылка на картинку'
                    id="outlined-basic"
                    variant="outlined"
                    name="image"
                    placeholder="Ссылка на картинку"
                    value={image}
                    onChange={({ target }) => {
                        setImage(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Заголовок'
                    id="outlined-basic"
                    variant="outlined"
                    name="title"
                    placeholder="Заголовок"
                    value={title}
                    onChange={({ target }) => {
                        setTitle(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Текст'
                    id="outlined-basic"
                    variant="outlined"
                    name="text"
                    placeholder="Текст"
                    value={text}
                    onChange={({ target }) => {
                        setText(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <button onClick={handleClick} className='createButton'>
                    Сохранить
                </button>
            </Grid>
        </Grid>
    )
}
