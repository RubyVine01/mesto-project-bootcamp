import { openPhotoPopup } from "../index.js"; // экспорт функции открытия попап
import { deletePhotoCard, addLike, deleteLike } from "../components/api.js";

export default function createCard(imageName, imageLink, settings, card) {
  const cardTemplate = document.getElementById(settings.templateId).content; //контент шаблона карточки

  const photoCard = cardTemplate
    .querySelector(settings.cardSelector)
    .cloneNode(true); // карточкуа со всем содержимым

  const likePhoto = photoCard.querySelector(settings.likeSelector); // кнопка "нравитяся"

  const likeCountEl = photoCard.querySelector(settings.likeCountSelector);

  const likeCount = card.likes.length;

 
  const checkLike = () => {
    const likeList = card.likes;
    likeList.forEach((like) => {
      //console.log(like._id);
      if (like._id === settings.profileId) {
        //console.log(like._id === settings.profileId);
        likePhoto.classList.add(settings.likeActiveClass);
      } else {
        likePhoto.classList.remove(settings.likeActiveClass);
      }
    });
  };


  const countLike = () => {
    if (likeCount > 0) {
      likeCountEl.textContent = likeCount;
      checkLike()
    } else {
      likeCountEl.remove();
    }
  };

  countLike();


  const deleteCard = photoCard.querySelector(settings.deleteSelector); // кнопка удалить

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

  photo.alt = imageName; //присваивание альтернотивного текста изображению



  // //позволяет активировать и деактивировать кнопку "нравится"
  // likePhoto.addEventListener("click", (evt) => {
  //   if (!likePhoto.classList.contains("photo-item__like-active")) {
  //     addLike(card._id)
  //       .then(() => {
  //         evt.target.classList.add(settings.likeActiveClass);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     deleteLike(card._id)
  //       .then(() => {
  //         evt.target.classList.remove(settings.likeActiveClass);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // });

  //открывает Popup при нажатии на картинку
  openPhotoPopup(photo, imageLink, imageName);

  return photoCard; // возвращает карточку
}
