// настройки для валидации форм
const validationSettings = {
  inputSelector: ".popup__input-text",
  buttonSelector: ".popup__button-save",
  formSelector: ".popup__form",
  invalidTextClass: "popup__input-text_invalid",
};

// настройки для создания карточки с фотографией
const cardSettings = {
  templateId: "photo-card",
  cardSelector: ".photo-item",
  likeSelector: ".photo-item__like",
  deleteSelector: ".photo-item__delete",
  cardPhotoSelector: ".photo-item__photo",
  photoDiscriptionSelector: ".photo-item__discription",
  popupPhotoId: "popup-view-photo",
  likeActiveClass: "photo-item__like-active",
  profileId: "8cd03160afd9d1eccff608ed",
  likeCountSelector: ".photo-item__like-count",
  popupPhotoImageSelector: ".popup__photo-image",
  popupPhotoDescription: ".popup__photo-description",
};

const btnSaveSettings = {
  loadingText: "Сохранение...",
};

const btnCreateSettings = {
  loadingText: "Создание...",
};

export { validationSettings, cardSettings, btnSaveSettings, btnCreateSettings };
