// в зависимости от условий добавляет или убирает признак загрузки(...)
function renderLoading(loading, button, buttonText, loadingText) {
  if (loading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// Универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузк
function handleSubmit(request, evt, settings) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, settings.loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, settings.loadingText);
    });
}

export { handleSubmit };
