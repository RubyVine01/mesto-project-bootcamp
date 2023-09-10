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
  return Promise.reject(`Ошибка: ${er.status}`);
}

const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    checkResponse
  );
};

const saveProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
};

const getPhotoCard = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    checkResponse
  );
};

const savePhotoCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

const deletePhotoCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};


const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export {
  getProfileInfo,
  saveProfileInfo,
  getPhotoCard,
  savePhotoCard,
  deletePhotoCard,
  addLike,
  deleteLike,

};

