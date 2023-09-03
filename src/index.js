import "./styles/index.css";

import createCard from "./components/card.js";
// ПЕРЕМЕННЫЕ
//

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля

const authorName = document.querySelector(".profile__author-name"); // текстовый элемент с именем профиля

const aboutAuthor = document.querySelector(".profile__about-author"); // текстовый элемент с информацией "О себе"

const popupEditProfile = document.getElementById("popup-edit-profile"); // popup редактирования профиля

const inputAuthorName = document.getElementById("input-name"); // поле ввода имени в форме редактирования профиля

const inputAboutAuthor = document.getElementById("input-about-author"); // поле ввода информации о себе в форме редактирования профиля

const formEditProfile = popupEditProfile.querySelector(".popup__form"); // форма в popup

// ДОБАВЛЕНИЕ ФОТО

const addPhoto = document.querySelector(".profile__add-button"); // кнопка добавления нового фото

const popupAddPhoto = document.getElementById("popup-add-photo"); // popup добавления нового фото

const formAddPhoto = popupAddPhoto.querySelector(".popup__form"); // форма в popup

const cardContainer = document.querySelector(".photo-place__list"); // список с фото-карточками

// ФУНКЦИИ
//

// функция открытия popup
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

//функция закрытия popup
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

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
  authorName.textContent = nameInputValue;
  aboutAuthor.textContent = jobInputValue;

  closePopup(popupEditProfile);
}

const cardSettings = {
  templateId: "photo-card",
  cardSelector: ".photo-item",
  likeSelector: ".photo-item__like",
  deleteSelector: ".photo-item__delete",
  cardPhotoSelector: ".photo-item__photo",
  photoDiscriptionSelector: ".photo-item__discription",
  popupPhotoId: "popup-view-photo",
  likeActiveClass: "photo-item__like-active",
};

const popupViewPhoto = document.getElementById("popup-view-photo"); //
const popupPhotoImage = popupViewPhoto.querySelector(".popup__photo-image");
const popupPhotoDescription = popupViewPhoto.querySelector(
  ".popup__photo-description"
);

export function openPhotoPopup(photo, imageLink, imageName) {
  // открывает модальное окно просмотра фото
  photo.addEventListener("click", () => {
    popupPhotoImage.src = imageLink; //присваивание изображения попапу просмотра
    popupPhotoImage.alt = imageName;
    popupPhotoDescription.textContent = imageName; //присваивание подписи к изображению попапу просмотра

    // открытие попапа просмотра изображения
    openPopup(popupViewPhoto);
  });
}

// функция добавляет карточку с фотографией при вызове в начало
function addPhotoCard(imageName, imageLink) {
  //создает карточку с фото
  cardContainer.prepend(createCard(imageName, imageLink, cardSettings));
}

// Создание новой карточки через форму добавления фото
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const inputPhotoName = document.getElementById("input-photo-name"); // поле ввода имени в форме редактирования профиля
  const inputPhotoLink = document.getElementById("input-photo-link"); // поле ввода информации о себе в форме редактирования профиля
  addPhotoCard(inputPhotoName.value, inputPhotoLink.value);
  closePopup(popupAddPhoto);
  formAddPhoto.reset();
}

const closeButtons = document.querySelectorAll(".popup__button-close"); //выбирает все закрытия попапа

// перебирает все кнопки  и находим ближайший к крестику попап
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// ИСПОЛНЕНИЕ КОДА
//

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  fillInpytValue(inputAuthorName, authorName); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "Имя Фамилия"
  fillInpytValue(inputAboutAuthor, aboutAuthor); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "О себе"
}); // вызов действия при клике на кнопку редактирования профиля

addPhoto.addEventListener("click", () => openPopup(popupAddPhoto)); // вызов действия при клике на кнопку добавления фото

formEditProfile.addEventListener("submit", handleProfileFormSubmit); //сохраняет значения введенные в форму редактирования профиля

// ? определиться нужно ли исправлять let
//перебирает значения в массиве и добавляет новые карточки
for (let initialCard of initialCards) {
  addPhotoCard(initialCard.name, initialCard.link);
}

//добавляет карточку фото при нажатии на кнопку "Сохранить"
formAddPhoto.addEventListener("submit", handlePhotoFormSubmit);
