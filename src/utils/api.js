import { config } from "./config";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  getPosts(postID) {
    const requestURL = postID
      ? `${this._url}/posts/${postID}`
      : `${this._url}/posts/`;
    return fetch(requestURL, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  addLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  deleteLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  deletePosts(itemID) {
    return fetch(`${this._url}/posts/${itemID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  createPost(post) {
    return fetch(`${this._url}/posts`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(onResponce);
  }

  getComments(postID) {
    return fetch(`${this._url}/posts/comments/${postID}`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  addComment(comment, postID) {
    return fetch(`${this._url}/posts/comments/${postID}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }).then(onResponce);
  }
  
  deleteComment(postID, commentID) {
    return fetch(`${this._url}/posts/comments/${postID}/${commentID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  getUsers(userID) {
    return fetch(`${this._url}/users/${userID}`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

}

export default new Api(config);
