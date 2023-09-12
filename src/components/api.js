const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-12",
  headers: {
    authorization: "fa0a7591-098c-48f3-849e-fd0e1a15dbe9",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(urlEnd, options) {
  const url = `${config.baseUrl}${urlEnd}`;
  return fetch(url, options).then(checkResponse);
}

const getProfileInfo = () => {
  const urlEnd = "/users/me";
  const options = { headers: config.headers };
  return request(urlEnd, options);
};

const saveProfileInfo = (name, about) => {
  const urlEnd = "/users/me";
  const options = {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  };
  return request(urlEnd, options);
};

const getPhotoCard = () => {
  const urlEnd = "/cards";
  const options = { headers: config.headers };
  return request(urlEnd, options);
};

const savePhotoCard = (name, link) => {
  const urlEnd = "/cards";
  const options = {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  };
  return request(urlEnd, options);
};

const deletePhotoCard = (id) => {
  const urlEnd = `/cards/${id}`;
  const options = {
    method: "DELETE",
    headers: config.headers,
  };
  return request(urlEnd, options);
};

const addLike = (id) => {
  const urlEnd = `/cards/likes/${id}`;
  const options = {
    method: "PUT",
    headers: config.headers,
  };
  return request(urlEnd, options);
};

const deleteLike = (id) => {
  const urlEnd = `/cards/likes/${id}`;
  const options = {
    method: "DELETE",
    headers: config.headers,
  };
  return request(urlEnd, options);
};

const addAuthorAvatar = (avatar) => {
  const urlEnd = "/users/me/avatar";
  const options = {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  };
  return request(urlEnd, options);
};

export {
  getProfileInfo,
  saveProfileInfo,
  getPhotoCard,
  savePhotoCard,
  deletePhotoCard,
  addLike,
  deleteLike,
  addAuthorAvatar,
};
