import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { TextField } from "@mui/material";

export const Header = ({
  userInfo,
  switchTheme,
  theme,
  setQuery,
  query,
  token,
  setUserInfo,
}) => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="header">
      <div className="logo">
        <h1 onClick={() => navigate("/")}>BAG-blog</h1>
      </div>
      {token && (
        <div className='textfield'>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={query}
            placeholder="Поиск"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </div>
      )}

      {token && (
        <div
          style={{ width: "200px" }}
        >
          <div className="user" onClick={() => navigate(`user/edit`)}>
            <img src={userInfo.avatar} />
            <div className="userInfo">
              <div
                style={{ color: "blue", fontWeight: "600", fontSize: "14px" }}
              >
                {userInfo.name}
              </div>
              <div style={{ color: "grey" }}>{userInfo.email}</div>
            </div>
          </div>
        </div>
      )}
      <div>
      <div style={{ display: "flex" }}>
        {token && (
          <button
            className="createBut"
            title="Создать пост"
            onClick={() => navigate("create")}
          >
            +
          </button>
        )}
        {token && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUserInfo([]);
            }}
          >
            Выход
          </button>
        )}
        <label title="Сменить тему">
          <Switch className="switch" {...label} onClick={switchTheme} />
          <br />
          {theme == "light" ? <div>Темная тема</div> : <div>Светлая тема</div>}
        </label>
      </div>
      </div>
    </div>
  );
};
