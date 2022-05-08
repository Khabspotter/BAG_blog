import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import "./style.css";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getUsers(params.userID)
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => alert(err));
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
        <div className="username">{userInfo?.name}</div>
        <div>
          <img style={{ maxWidth: 600 }} src={userInfo?.avatar} />
        </div>
        <div style={{display:"flex"}}>
          <div className="desc">Род деятельности:</div> {userInfo?.about}
        </div>
        <div style={{display:"flex"}}>
          <div className="desc">E-mail: </div>
          {userInfo?.email}
        </div>
      </div>
    </div>
  );
};
