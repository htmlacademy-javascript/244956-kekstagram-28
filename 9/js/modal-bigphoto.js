
import {userComments} from './pictures.js';

const COMMENTSPERTURN = 5;
let commentsLoaded = COMMENTSPERTURN;

const commentsContainer = document.querySelector('.social__comments');//parent container
const miniPhotos = document.querySelectorAll('.picture');
const bigPhotoBlock = document.querySelector('.big-picture');
const closeModal = document.querySelector('.big-picture__cancel');
const moreCommentsLoader = document.querySelector('.comments-loader');
const isEscapeKey = (evt) => evt.key === 'Escape';
const comCountContainer = document.querySelector('.social__comment-count');

const createBigPhotoComment = function (number) {

  commentsContainer.innerHTML = ''; // delete data from parent container

  for (let i = 0; i < number; i++) { //этот цикл генерирует комментарии
    const commentBlock = document.createElement('li');
    commentBlock.classList.add('social__comment');
    const commentPicture = document.createElement('img');
    commentPicture.classList.add = ('social__picture');
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentBlock.appendChild(commentPicture);
    commentBlock.appendChild(commentText);
    commentsContainer.appendChild(commentBlock);

    commentText.textContent = userComments[i].message;
    commentPicture.src = userComments[i].avatar;
    commentPicture.alt = userComments[i].name;
  }
};


const openUserModal = function () {//Открытие модального окна
  comCountContainer.innerHTML = '';
  comCountContainer.innerHTML = '<div class="social__comment-count"><span class = "loaded-comments"></span> из <span class="total-comments"></span> коментариев</div>';
  const loadedCom = document.querySelector('.loaded-comments');
  const totalCom = document.querySelector('.total-comments');

  for (let i = 0; i <= miniPhotos.length - 1; i++) {

    const likes = document.querySelectorAll('.picture__likes');
    const element = miniPhotos[i];
    const picImg = document.querySelectorAll('.picture__img');
    const comCount = document.querySelectorAll('.picture__comments');

    element.addEventListener ('click', (evt) => {
      evt.preventDefault();
      bigPhotoBlock.classList.remove('hidden');

      document.body.classList.add('modal-open');

      //--Данные, которые передаются с миниатюр
      bigPhotoBlock.querySelector('img').src = picImg[i].src;
      bigPhotoBlock.querySelector('.likes-count').textContent = likes[i].textContent;
      bigPhotoBlock.querySelector('.social__caption').textContent = picImg[i].alt;


      totalCom.textContent = comCount[i].textContent; //Общее число комментариев
      loadedCom.textContent = commentsLoaded;

      createBigPhotoComment(commentsLoaded);//Вызов функции генератора комментариев
    });
  }

  const loadMoreComments = function () {

    moreCommentsLoader.addEventListener('click', (evt) => {
      evt.preventDefault();
      commentsLoaded += COMMENTSPERTURN;
      createBigPhotoComment (commentsLoaded);
      loadedCom.textContent = commentsLoaded;

      if (+loadedCom.textContent >= +totalCom.textContent) {
        moreCommentsLoader.classList.add('hidden');
        loadedCom.textContent = totalCom.textContent;
      }
    });
  };
  loadMoreComments();
};

function closeUserModal() {

  closeModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPhotoBlock.classList.add('hidden');
    document.body.classList.remove('modal-open');
    moreCommentsLoader.removeEventListener('click', (evt));
    commentsLoaded = 5;
    moreCommentsLoader.classList.remove('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPhotoBlock.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', (evt));
      moreCommentsLoader.removeEventListener('click', (evt));
      commentsLoaded = 5;
      moreCommentsLoader.classList.remove('hidden');
    }
  });
}

export {openUserModal, closeUserModal };
