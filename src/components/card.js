import { openPhotoPopup } from "../index.js"; // экспорт функции открытия попап
import { deletePhotoCard, addLike, deleteLike } from "../components/api.js";

export default function createCard(imageName, imageLink, settings, card) {
  const cardTemplate = document.getElementById(settings.templateId).content; //контент шаблона карточки

  const photoCard = cardTemplate
    .querySelector(settings.cardSelector)
    .cloneNode(true); // карточкуа со всем содержимым

  const likePhoto = photoCard.querySelector(settings.likeSelector); // кнопка "нравится"

  const likeCountEl = photoCard.querySelector(settings.likeCountSelector); // элемент отображения кол-ва лайков

  const likeCount = card.likes.length; // кол-во лайков

  // проверяет есть ли среди полученного массива лайков, лайк владельца профиля и отображает его
  const checkLike = () => {
    const likeList = card.likes;
    likeList.forEach((like) => {
      if (like._id === settings.profileId) {
        likePhoto.classList.add(settings.likeActiveClass);
      } else {
        likePhoto.classList.remove(settings.likeActiveClass);
      }
    });
  };

  // проверяет количество лайков и отображает если кол-во > 0
  const countLike = (likeCount) => {
    if (likeCount > 0) {
      //likeCountEl.add();
      likeCountEl.textContent = likeCount;
      checkLike();
    } else {
      likeCountEl.textContent = "";
    }
  };

  countLike(likeCount);

  const deleteCard = photoCard.querySelector(settings.deleteSelector); // кнопка удалить

  // если картинка принадлежит владельцу, отображается кнопка удалить
  if (card.owner._id !== settings.profileId) {
    deleteCard.remove();
  } else {
    deleteCard.addEventListener("click", () => {
      deletePhotoCard(card._id)
        .then(() => {
          photoCard.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  const photo = photoCard.querySelector(settings.cardPhotoSelector); //изображение в карточке

  const photoDiscription = photoCard.querySelector(
    settings.photoDiscriptionSelector
  ); // название картинки

  photoDiscription.textContent = imageName; //присваивание заголовка карточке

  photo.src = imageLink; //присваивание изображения карточке

  photo.alt = imageName; //присваивание альтернативного текста изображению

  //позволяет активировать и деактивировать кнопку "нравится"
  likePhoto.addEventListener("click", (evt) => {
    if (!likePhoto.classList.contains("photo-item__like-active")) {
      addLike(card._id)
        .then((res) => {
          const likeCount = res.likes.length;
          countLike(likeCount);
          evt.target.classList.add(settings.likeActiveClass);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(card._id)
        .then((res) => {
          const likeCount = res.likes.length;
          countLike(likeCount);
          evt.target.classList.remove(settings.likeActiveClass);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  //открывает Popup при нажатии на картинку
  openPhotoPopup(photo, imageLink, imageName);

  return photoCard; // возвращает карточку
}
