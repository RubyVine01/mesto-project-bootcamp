import { openPhotoPopup } from "../index.js"; // экспорт функции открытия попап

export default function createCard(imageName, imageLink, settings) {
  const cardTemplate = document.getElementById(settings.templateId).content; //контент шаблона карточки

  const photoCard = cardTemplate
    .querySelector(settings.cardSelector)
    .cloneNode(true); // карточкуа со всем содержимым

  const likePhoto = photoCard.querySelector(settings.likeSelector); // кнопка "нравитяся"

  const deleteCard = photoCard.querySelector(settings.deleteSelector); // кнопка удалить

  const photo = photoCard.querySelector(settings.cardPhotoSelector); //изображение в карточке

  const photoDiscription = photoCard.querySelector(
    settings.photoDiscriptionSelector
  ); // название картинки

  photoDiscription.textContent = imageName; //присваивание заголовка карточке

  photo.src = imageLink; //присваивание изображения карточке

  photo.alt = imageName; //присваивание альтернотивного текста изображению

  //позволяет активировать и деактивировать кнопку "нравится"
  likePhoto.addEventListener("click", (evt) =>
    evt.target.classList.toggle(settings.likeActiveClass)
  );

  //удаляет карточку с фото
  deleteCard.addEventListener("click", () => photoCard.remove());

  //открывает Popup при нажатии на картинку
  openPhotoPopup(photo, imageLink, imageName);

  return photoCard; // возвращает карточку
}
