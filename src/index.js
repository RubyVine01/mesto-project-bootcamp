//ИМПОРТ

import "./styles/index.css"; // импорт стилей

import createCard from "./components/card.js"; // импорт функции создания карточек

import { openPopup, closePopup } from "./components/modal.js"; //импорт функций работы с модальными окнами

import { enableValidation } from "./components/validate.js"; //импорт функции валидации форм

// Функции API запросов
import {
  getProfileInfo,
  saveProfileInfo,
  getPhotoCard,
  savePhotoCard,
  addAuthorAvatar,
} from "./components/api.js";

// Функции валидации форм
import {
  validationSettings,
  cardSettings,
  btnSaveSettings,
  btnCreateSettings,
} from "./components/const.js";

// универсальная функция обработки сабмита
import { handleSubmit } from "./components/utils.js";

// ПЕРЕМЕННЫЕ

// профиль пользователя
const editAvatarButton = document.querySelector(".profile__edit-avatar-button"); // кнопка редактирования аватара
const profileAvatar = document.querySelector(".profile__avatar"); // аватар пользователя
const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const authorName = document.querySelector(".profile__author-name"); // текстовый элемент с именем профиля
const aboutAuthor = document.querySelector(".profile__about-author"); // текстовый элемент с информацией "О себе"

// попап редактирования аватара
const popupEditAvatar = document.getElementById("popup-edit-avatar"); // popup редактирования аватара
const inputAvatarLink = document.getElementById("input-avatar-link"); // поле ввода ссылки в форме редактирования аватара
const formEditAvatar = popupEditAvatar.querySelector(".popup__form"); // форма в popup

// попап редактирования профиля пользователя
const popupEditProfile = document.getElementById("popup-edit-profile"); // popup редактирования профиля
const inputAuthorName = document.getElementById("input-name"); // поле ввода имени в форме редактирования профиля
const inputAboutAuthor = document.getElementById("input-about-author"); // поле ввода информации о себе в форме редактирования профиля
const formEditProfile = popupEditProfile.querySelector(".popup__form"); // форма в popup

// попап создания новой карточки с фото
const addPhoto = document.querySelector(".profile__add-button"); // кнопка добавления нового фото
const popupAddPhoto = document.getElementById("popup-add-photo"); // popup добавления нового фото
const formAddPhoto = popupAddPhoto.querySelector(".popup__form"); // форма в popup
const inputPhotoName = document.getElementById("input-photo-name"); // поле ввода имени в форме редактирования профиля
const inputPhotoLink = document.getElementById("input-photo-link"); // поле ввода информации о себе в форме редактирования профиля
const buttonSaveCard = document.querySelector(".save_card");

// контейнер для карточек с фото
const cardContainer = document.querySelector(".photo-place__list"); // список с фото-карточками

// все попапы и кнопки закрытия
const popupList = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__button-close"); //выбирает все закрытия попапа

// ФУНКЦИИ
//
//функция заполнения input.value в форме полученными значениями
function fillInpytValue(inputName, content) {
  const contentValue = content.innerText; // получает текстовое значение
  inputName.setAttribute("value", contentValue); // вставляет его в input.value
}

//отправка ссылки на аватар на сервер
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return addAuthorAvatar(inputAvatarLink.value).then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(popupEditAvatar);
    });
  }
  handleSubmit(makeRequest, evt, btnSaveSettings);
}

// Сохранение отредактированных в форме значений имени и информации о себе
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return saveProfileInfo(inputAuthorName.value, inputAboutAuthor.value).then(
      (res) => {
        authorName.textContent = res.name;
        aboutAuthor.textContent = res.about;
        closePopup(popupEditProfile);
      }
    );
  }
  handleSubmit(makeRequest, evt, btnSaveSettings);
}

// добавляет карточку с фотографией при вызове в начало контейнера
function addPhotoCard(newCard) {
  //создает карточку с фото
  cardContainer.prepend(newCard);
}

// Создание новой карточки через форму добавления фото
function handlePhotoFormSubmit(evt) {
  function makeRequest() {
    return savePhotoCard(inputPhotoName.value, inputPhotoLink.value).then(
      (card) => {
        const newCard = createCard(card.name, card.link, cardSettings, card);
        addPhotoCard(newCard);
        closePopup(popupAddPhoto);
      }
    );
  }
  handleSubmit(makeRequest, evt, btnCreateSettings);
}

// ИСПОЛНЕНИЕ КОДА
// получает данные профиля и список карточек с сервера
Promise.all([getProfileInfo(), getPhotoCard()])
  .then(([userData, cards]) => {
    // установка данных пользователя
    authorName.textContent = userData.name;
    aboutAuthor.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    // отрисовка карточек
    cards.reverse().forEach((card) => {
      const newCard = createCard(card.name, card.link, cardSettings, card);
      addPhotoCard(newCard);
    });
  })
  .catch((err) => {
    // ловим ошибку
    console.error;
  });

// закрывает попапы
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

// при нажатии кнопку редактировать профиль, открывает попап и заполняет инпуты
editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  fillInpytValue(inputAuthorName, authorName);
  fillInpytValue(inputAboutAuthor, aboutAuthor);
});

// открывает попап добавления фото при нажатии на кнопу
addPhoto.addEventListener("click", () => {
  openPopup(popupAddPhoto);
});

// сохраняет значения введенные в форму редактирования профиля
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// добавляет карточку фото при нажатии на кнопку "Сохранить"
formAddPhoto.addEventListener("submit", handlePhotoFormSubmit);

// включает валидацию полей форм
enableValidation(validationSettings);

// открывает попап изменения аватара
editAvatarButton.addEventListener("click", () => openPopup(popupEditAvatar));

// отправляет данные об аватаре и заменяет изображение
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);
