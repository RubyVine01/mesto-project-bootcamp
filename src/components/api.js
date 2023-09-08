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

export { getProfileInfo, saveProfileInfo };


