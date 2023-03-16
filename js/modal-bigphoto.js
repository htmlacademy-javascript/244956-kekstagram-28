
import {userPhotos} from './pictures.js';
import {createRandomNorepeat} from './random-functions.js';
import {NUMBEROFCOMMENTS} from './data.js';

const miniPhotos = document.querySelectorAll('.picture');
const bigPhotoBlock = document.querySelector('.big-picture');
const closeModal = document.querySelector('.big-picture__cancel');
const isEscapeKey = (evt) => evt.key === 'Escape';


for (let i = 0; i <= miniPhotos.length - 1; i++) {

  const likes = document.querySelectorAll('.picture__likes');
  const element = miniPhotos[i];
  const picImg = document.querySelectorAll('.picture__img');

  element.addEventListener ('click', (evt) => { //Здесь ошибка в консоли(!)

    evt.preventDefault();
    bigPhotoBlock.classList.remove('hidden');

    bigPhotoBlock.querySelector('.social__comment-count').classList.add('hidden');//счетчик комментариев
    bigPhotoBlock.querySelector('.comments-loader').classList.add('hidden');// загрузка новых комментариев
    document.body.classList.add('modal-open');

    //--Данные, которые передаются с миниатюр
    bigPhotoBlock.querySelector('img').src = picImg[i].src;
    bigPhotoBlock.querySelector('.likes-count').textContent = likes[i].textContent;
    bigPhotoBlock.querySelector('.social__caption').textContent = picImg[i].alt;
    //---

    const randomIndex = createRandomNorepeat(0, (userPhotos.length - 1)); //генератор индекса массива (убрать в random-functions?)
    const commentsContainer = document.querySelector('.social__comments'); //parent container
    commentsContainer.innerHTML = ''; // delete data from parent container

    for (i = 1; i <= NUMBEROFCOMMENTS; i++) { //этот цикл генерирует комментарии
      const commentBlock = document.createElement('li');
      commentBlock.classList.add('social__comment');
      const commentPicture = document.createElement('img');
      commentPicture.classList.add = ('social__picture');
      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentBlock.appendChild(commentPicture);
      commentBlock.appendChild(commentText);
      commentsContainer.appendChild(commentBlock);

      commentText.textContent = userPhotos[randomIndex()].comments.message;
      commentPicture.src = userPhotos[randomIndex()].comments.avatar;
      commentPicture.alt = userPhotos[randomIndex()].comments.name;
    }
  });

  closeModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPhotoBlock.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPhotoBlock.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown');
    }
  });
}

