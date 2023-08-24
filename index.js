//ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
// кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");

//функция открытия popup, может быть использована для открытия всех popup
function openPopup() {
  popup.classList.add("popup_opened");
}

//ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
// вызов действия при клике на кнопку редактирования профиля
editButton.addEventListener("click", openPopup);

// кнопка закрытия popup
const closeButton = document.querySelector(".popup__button-close");

// вызов действия при клике на кнопку закрытия popup
function closePopup() {
  popup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);


//ЗАПОЛНЕНИЕ ИНПУТОВ ЗНАЧЕНИЯМИ
// поле ввода для Имя и Фамилии
const inputName = document.getElementById("input-name");
// выбираем элемент из которого будем выбирать значение для заполнения
const authorName = document.querySelector(".profile__author-name");
//  выбираем значение для заполнения инпута
let authorNameContent = authorName.innerText;
// заполняем инпут
inputName.setAttribute("value", authorNameContent);

// вариант через функцию
const inputAboutSelf = document.getElementById("input-about-author");
const aboutAuthor = document.querySelector(".profile__about-author");

function fillInpytValue(inputName, content) {
  let contentValue = content.innerText;
  inputName.setAttribute("value", contentValue);
}

fillInpytValue(inputAboutSelf, aboutAuthor);

// Редактирование имени и информации о себе
const formElement = document.querySelector(".popup__form");
const nameInput = document.getElementById("input-name");
const jobInput = document.getElementById("input-about-author");

function handleFormSubmit(evt) {
  evt.preventDefault();
  inputName.setAttribute("value", authorNameContent);
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  authorName.innerHTML = nameInputValue;
  aboutAuthor.innerHTML = jobInputValue;
  closePopup()
}

formElement.addEventListener("submit", handleFormSubmit);
