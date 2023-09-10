//ИМПОРТ
//
import "./styles/index.css"; // импорт стилей

import createCard from "./components/card.js"; // импорт функции создания карточек

import { openPopup, closePopup, closeOverlay } from "./components/modal.js"; //импорт функций работы с модальными окнами

import { enableValidation, disableButton } from "./components/validate.js"; //импорт функции валидации форм

import {
  getProfileInfo,
  saveProfileInfo,
  getPhotoCard,
  savePhotoCard,
  deletePhotoCard,
} from "./components/api.js";
// ПЕРЕМЕННЫЕ
//

// массив изображений для создания карточек

// настройки для валидации форм
const validationSettings = {
  inputSelector: ".popup__input-text",
  buttonSelector: ".popup__button-save",
  formSelector: ".popup__form",
  invalidTextClass: "popup__input-text_invalid",
};

// настройки для создания карточки с фотографией
const cardSettings = {
  templateId: "photo-card",
  cardSelector: ".photo-item",
  likeSelector: ".photo-item__like",
  deleteSelector: ".photo-item__delete",
  cardPhotoSelector: ".photo-item__photo",
  photoDiscriptionSelector: ".photo-item__discription",
  popupPhotoId: "popup-view-photo",
  likeActiveClass: "photo-item__like-active",
  profileId: "8cd03160afd9d1eccff608ed",
  likeCountSelector: ".photo-item__like-count",
};

// профиль пользователя
const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const authorName = document.querySelector(".profile__author-name"); // текстовый элемент с именем профиля
const aboutAuthor = document.querySelector(".profile__about-author"); // текстовый элемент с информацией "О себе"

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

// попап просмотра изображений
const popupViewPhoto = document.getElementById("popup-view-photo"); //
const popupPhotoImage = popupViewPhoto.querySelector(".popup__photo-image");
const popupPhotoDescription = popupViewPhoto.querySelector(
  ".popup__photo-description"
);

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

// Сохранение отредактированных в форме значений имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = inputAuthorName.value;
  const jobInputValue = inputAboutAuthor.value;

  saveProfileInfo(nameInputValue, jobInputValue)
    .then((res) => {
      authorName.textContent = res.name;
      aboutAuthor.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    });
}

// открывает модальное окно просмотра фото
export function openPhotoPopup(photo, imageLink, imageName) {
  photo.addEventListener("click", () => {
    popupPhotoImage.src = imageLink; //присваивание изображения попапу просмотра
    popupPhotoImage.alt = imageName;
    popupPhotoDescription.textContent = imageName; //присваивание подписи к изображению попапу просмотра

    // открытие попапа просмотра изображения
    openPopup(popupViewPhoto);
  });
}

// добавляет карточку с фотографией при вызове в начало контейнера
function addPhotoCard(newCard) {
  //создает карточку с фото
  cardContainer.append(newCard);
}

// Создание новой карточки через форму добавления фото
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  savePhotoCard(inputPhotoName.value, inputPhotoLink.value)
    .then((card) => {
      const newCard = createCard(card.name, card.link, cardSettings, card);
      addPhotoCard(newCard);
      
      formAddPhoto.reset();
      closePopup(popupAddPhoto);
    })
    .catch((err) => {
      console.log(err);
    });
}

// ИСПОЛНЕНИЕ КОДА

//получает данные профиля
getProfileInfo()
  .then((res) => {
    authorName.textContent = res.name;
    aboutAuthor.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  });

getPhotoCard()
  .then((res) => {
    res.forEach((card) => {
      const newCard = createCard(card.name, card.link, cardSettings, card);
      addPhotoCard(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// перебирает все кнопки  и находим ближайший к крестику попап
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// закрывает попап при нажатии на Escape или клику по Overlay
popupList.forEach((popup) => {
  closeOverlay(popup);
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
  disableButton(buttonSaveCard);
});

// сохраняет значения введенные в форму редактирования профиля
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// добавляет карточку фото при нажатии на кнопку "Сохранить"
formAddPhoto.addEventListener("submit", handlePhotoFormSubmit);

// включает валидацию полей форм
enableValidation(validationSettings);
