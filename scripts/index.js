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

const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля

const addPhoto = document.querySelector(".profile__add-button"); // кнопка добавления нового фото

const authorName = document.querySelector(".profile__author-name"); // текстовый элемент с именем профиля

const aboutAuthor = document.querySelector(".profile__about-author"); // текстовый элемент с информацией "О себе"

const popup = document.querySelector(".popup"); // popup

const popupEditProfile = document.getElementById("popup-edit-profile"); // popup редактирования профиля

const popupAddPhoto = document.getElementById("popup-add-photo"); // popup добавления нового фото

const closeButton = document.querySelector(".popup__button-close"); // кнопка закрытия popup

console.log(closeButton)

const formElement = popup.querySelector(".popup__form");

const inputAuthorName = document.getElementById("input-name"); // поле ввода имени в форме редактирования профиля

const inputAboutAuthor = document.getElementById("input-about-author"); // поле ввода информации о себе в форме редактирования профиля

const cardContainer = document.querySelector(".photo-place__list"); // список с фото-карточками

// функция открытия popup
function openPopup() {
  popup.classList.add("popup_opened");
}

//функция закрытия popup
function closePopup() {
  popup.classList.remove("popup_opened");
}

//функция заполнения input.value в форме полученными значениями

function fillInpytValue(inputName, content) {
  let contentValue = content.innerText; // получает текстовое значение
  inputName.setAttribute("value", contentValue); // вставляет его в input.value
}

// Сохранение отредактированных в форме значений имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInputValue = inputAuthorName.value;
  let jobInputValue = inputAboutAuthor.value;
  authorName.textContent = nameInputValue;
  aboutAuthor.textContent = jobInputValue;

  closePopup();
}

// функция добавляет карточку с фотографией при вызове
function addPhotoCard(imageName, imageLink) {
  const photoCardTemplate = document.querySelector("#foto-card").content;
  const photoCard = photoCardTemplate
    .querySelector(".photo-item")
    .cloneNode(true);
  photoCard.querySelector(".photo-item__discription").textContent = imageName;
  photoCard.querySelector(".photo-item__photo").src = imageLink;

  cardContainer.append(photoCard);
}

editButton.addEventListener("click", openPopup); // вызов действия при клике на кнопку редактирования профиля

//addPhoto.addEventListener("click", openPopup); // вызов действия при клике на кнопку редактирования профиля

addPhoto.addEventListener("click", function () {
  popupAddPhoto.classList.add("popup_opened");
}); // вызов действия при клике на кнопку редактирования профиля

closeButton.addEventListener("click", closePopup); // вызов действия при клике на кнопку закрытия popup, действует для всех popup

fillInpytValue(inputAboutAuthor, aboutAuthor); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "О себе"

fillInpytValue(inputAuthorName, authorName); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "О себе"

formElement.addEventListener("submit", handleFormSubmit); //сохраняет значения введенные в форму редактирования профиля

//перебирает значения в массиве и добавляет новые карточки
for (let initialCard of initialCards) {
  addPhotoCard(initialCard.name, initialCard.link);
}




