import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import "./index.css";

export const EditUser = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const api=useApi()
  const handleChange = () => {
    api
      .editUser({
        name,
        about,
      })
      .then((data) => {
        setUserInfo(data);
        navigate("/");
      })
      .catch((err) => alert(err));
    api
      .editUserAvatar({
        avatar,
      })
      .then((data) => {
        setUserInfo(data);
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setName(data.name);
      setAbout(data.about);
      setAvatar(data.avatar);
    }).catch((err) => alert(err));
  }, []);

  return (
    <div className="userpage">
      <div className="buttons">
        <div>
          <button onClick={() => window.history.back()}>Назад</button>
          <button onClick={() => navigate("/")}>На главную</button>
        </div>
      </div>
      <div className="usercard">
        <div className="username">Редактирование информации</div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Имя: </div>
          <input
            name="name"
            placeholder="Имя"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Фото профиля: </div>
          <input
            name="image"
            className="imagesrc"
            placeholder="Ссылка на картинку"
            value={avatar}
            onChange={({ target }) => {
              setAvatar(target.value);
            }}
          />
        </div>

        <div>
          <img style={{ maxWidth: 600 }} src={avatar} />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">Род деятельности:</div>{" "}
          <input
            name="image"
            placeholder="Введите описание"
            value={about}
            onChange={({ target }) => {
              setAbout(target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div className="desc">E-mail: </div>
          {userInfo?.email}
        </div>
        <button
          onClick={() => {
            handleChange();
            navigate("/");
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
