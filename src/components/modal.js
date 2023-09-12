// функция открытия popup
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

//функция закрытия popup
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// функция закрытия при нажатии на Escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//Открытие попапа просмотра фото
function openPhotoPopup(photo, imageLink, imageName, settings) {
  // константы попапа просмотра изображений
  const popupViewPhoto = document.getElementById(settings.popupPhotoId); //
  const popupPhotoImage = popupViewPhoto.querySelector(
    settings.popupPhotoImageSelector
  );
  const popupPhotoDescription = popupViewPhoto.querySelector(
    settings.popupPhotoDescription
  );

  photo.addEventListener("click", () => {
    popupPhotoImage.src = imageLink; //присваивание изображения попапу просмотра
    popupPhotoImage.alt = imageName;
    popupPhotoDescription.textContent = imageName; //присваивание подписи к изображению попапу просмотра

    // открытие попапа
    openPopup(popupViewPhoto);
  });
}

export { openPopup, closePopup, openPhotoPopup };
