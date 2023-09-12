// в зависимости от условий добавляет или убирает признак загрузки(...)
function renderLoading(loading, button, buttonText, loadingText) {
    if (loading) {
      button.textContent = loadingText;
    } else {
      button.textContent = buttonText;
    }
  }

  export {renderLoading}