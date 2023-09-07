// функция отображения ошибки
function showError(input, errorText, settings) {
  const errorId = "error-" + input.id; //
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorText;
  input.classList.add(settings.invalidTextClass);
}

// функция скрытия ошибки
function hideError(input, settings) {
  const errorId = "error-" + input.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  input.classList.remove(settings.invalidTextClass);
}

// функция проверки данных в поле
function checkField(input, settings) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage, settings);
  } else {
    hideError(input, settings);
  }
}

// функция включения кнопки
function enableButton(button) {
  button.disabled = false;
}

// функция выключения кнопки
function disableButton(button) {
  button.disabled = true;
}

// функция включает и выключает кнопку в зависимости от условий
function checkButton(formElement, buttonSubmit) {
  if (formElement.checkValidity()) {
    enableButton(buttonSubmit);
  } else {
    disableButton(buttonSubmit);
  }
}

// функция запускает слушателей input
function setEventListeners(formElement, settings) {
  const buttonSubmit = formElement.querySelector(settings.buttonSelector);
  disableButton(buttonSubmit);
  const inputList = formElement.querySelectorAll(settings.inputSelector);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkField(input, settings);
      checkButton(formElement, buttonSubmit);
    });
  });
}

// функция проверяет валидации
function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

export { enableValidation, disableButton };
