// функция открытия popup
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape); 
}

//функция закрытия popup
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

function closeOverlay(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened'); 
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, closeOverlay};


