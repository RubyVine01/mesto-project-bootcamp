const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля

const authorName = document.querySelector(".profile__author-name"); // текстовый элемент с именем профиля 

const aboutAuthor = document.querySelector(".profile__about-author");// текстовый элемент с информацией "О себе"

const popup = document.querySelector(".popup"); // popup

const closeButton = popup.querySelector(".popup__button-close"); // кнопка закрытия popup

const formElement = popup.querySelector(".popup__form");

const inputAuthorName = document.getElementById("input-name"); // поле ввода имени в форме редактирования профиля

const inputAboutAuthor = document.getElementById("input-about-author"); // поле ввода информации о себе в форме редактирования профиля


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
  authorName.innerHTML = nameInputValue;
  aboutAuthor.innerHTML = jobInputValue;

  closePopup()
}


editButton.addEventListener("click", openPopup); // вызов действия при клике на кнопку редактирования профиля

closeButton.addEventListener("click", closePopup);// вызов действия при клике на кнопку закрытия popup, действует для всех popup


fillInpytValue(inputAboutAuthor, aboutAuthor); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "О себе"

fillInpytValue(inputAuthorName, authorName); // вызов функции для заполнения input.value в форме редактирования профиля пользователя для поля "О себе"


formElement.addEventListener("submit", handleFormSubmit);




