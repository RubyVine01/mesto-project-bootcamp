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

const closeButtonEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
); // кнопка закрытия popup редактирования профиля

const inputAuthorName = document.getElementById("input-name"); // поле ввода имени в форме редактирования профиля

const inputAboutAuthor = document.getElementById("input-about-author"); // поле ввода информации о себе в форме редактирования профиля

const formEditProfile = popupEditProfile.querySelector(".popup__form"); // форма в popup

// ДОБАВЛЕНИЕ ФОТО

const addPhoto = document.querySelector(".profile__add-button"); // кнопка добавления нового фото

const popupAddPhoto = document.getElementById("popup-add-photo"); // popup добавления нового фото

const popupViewPhoto = document.getElementById("popup-view-photo");  ///???Пока строка дублируется

const popupPhotoImage = popupViewPhoto.querySelector(".popup__photo-image")
const popupPhotoDescription =  popupViewPhoto.querySelector(".popup__photo-description") 

const closeButtonAddPhoto = popupAddPhoto.querySelector(".popup__button-close"); // кнопка закрытия popup добавления фото

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




// функция добавляет карточку с фотографией при вызове
function addPhotoCard(imageName, imageLink) {
 
 
  //*
  const photoCardTemplate = document.getElementById("photo-card").content; //контент шаблона карточки

  const photoCard = photoCardTemplate
    .querySelector(".photo-item")
    .cloneNode(true); // карточкуа со всем содержимым

   const photoLike = photoCard.querySelector(".photo-item__like"); // кнопка "нравитяся"

  const photoDelete = photoCard.querySelector(".photo-item__delete"); // кнопка удалить
//***


  const popupViewPhoto = document.getElementById("popup-view-photo"); //попап просмотра фото

  const closeButtonViewPhoto = popupViewPhoto.querySelector(
    ".popup__button-close"
  ); //кнопка закрытия попапа просмотра фото

  const photoView = photoCard.querySelector(".photo-item__photo"); //изображение в карточке

  photoCard.querySelector(".photo-item__discription").textContent = imageName; //присваивание заголовка карточке

  photoCard.querySelector(".photo-item__photo").src = imageLink; //присваивание изображения карточке

  photoCard.querySelector(".photo-item__photo").alt = imageName;


  //*
  //позволяет активировать и деактивировать кнопку "нравится"
  photoLike.addEventListener("click", (evt) =>
    evt.target.classList.toggle("photo-item__like-active")
  );

  //удаляет карточку с фото
  photoDelete.addEventListener("click", () => photoCard.remove());
//*** 


  // открывает модальное окно просмотра фото
  photoView.addEventListener("click", () => {
    popupPhotoImage.src = imageLink; //присваивание изображения попапу просмотра
    popupPhotoImage.alt = imageName ;
    popupPhotoDescription.textContent = imageName; //присваивание подписи к изображению попапу просмотра

    // открытие попапа просмотра изображения
    openPopup(popupViewPhoto);
  });

  // закрывает модальное окно просмотра фото
  closeButtonViewPhoto.addEventListener("click", () =>
    closePopup(popupViewPhoto)
  );

  //создает карточку с фото
  cardContainer.prepend(photoCard);
}






// Создание новой карточки через форму добавления фото
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const inputPhotoName = document.getElementById("input-photo-name"); // поле ввода имени в форме редактирования профиля
  const inputPhotoLink = document.getElementById("input-photo-link"); // поле ввода информации о себе в форме редактирования профиля
  addPhotoCard(inputPhotoName.value, inputPhotoLink.value);
  closePopup(popupAddPhoto);
  inputPhotoName.value = "";
  inputPhotoLink.value = "";
}

// ИСПОЛНЕНИЕ КОДА
//

editButton.addEventListener("click", () => openPopup(popupEditProfile)); // вызов действия при клике на кнопку редактирования профиля

addPhoto.addEventListener("click", () => openPopup(popupAddPhoto)); // вызов действия при клике на кнопку добавления фото

closeButtonEditProfile.addEventListener("click", () =>
  closePopup(popupEditProfile)
); // вызов действия при клике на закрытие формы редактирования профиля

closeButtonAddPhoto.addEventListener("click", () => closePopup(popupAddPhoto)); // вызов действия при клике на закрытие формы добавления фото

fillInpytValue(inputAuthorName, authorName); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "Имя Фамилия"

fillInpytValue(inputAboutAuthor, aboutAuthor); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "О себе"

formEditProfile.addEventListener("submit", handleProfileFormSubmit); //сохраняет значения введенные в форму редактирования профиля


// ? определиться нужно ли исправлять let
//перебирает значения в массиве и добавляет новые карточки
for (let initialCard of initialCards) {
  addPhotoCard(initialCard.name, initialCard.link);
}

//добавляет карточку фото при нажатии на кнопку "Сохранить"
formAddPhoto.addEventListener("submit", handlePhotoFormSubmit);
