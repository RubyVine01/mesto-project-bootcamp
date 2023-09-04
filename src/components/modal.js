// функция открытия popup
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

//функция закрытия popup
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

function closeOverlay(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

function closeEscape(popup) {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

export { openPopup, closePopup, closeOverlay, closeEscape };
