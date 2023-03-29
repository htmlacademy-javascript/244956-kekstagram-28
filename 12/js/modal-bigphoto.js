import {renderSimilarPhoto} from './pictures.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const container = document.querySelector('.pictures');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
let commentsShown = 0;
const COMMENTSPERPORTION = 5;


const createComment = ({avatar, name, message }) => { //создать комментарий
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  const commentPicture = document.createElement('img');
  commentPicture.classList.add = ('social__picture');
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  comment.appendChild(commentPicture);
  comment.appendChild(commentText);

  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentText.textContent = message;

  return comment;
};

const renderComments = (comments) => { //функция добавление комментариев в фото, обновление количество ком.
  commentsShown += COMMENTSPERPORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count"> ${comments.length} </span> комментариев`;
};

const hideBigPicture = () => { //закрытие модального окна
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const renderPictureDetails = ({description, url, likes}) => { //запись деталей из миниатюр

  bigPicture.querySelector('img').alt = description;
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};


const showBigPicture = (data) => { //отрисовка большой картинки
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);

  commentsLoader.addEventListener('click', (evt) => { //дополнительные комментарии
    evt.preventDefault();
    renderComments(data.comments);
  });
};

const onCancelButtonClick = () => { // закрытие окна по кнопке
  hideBigPicture();
};
cancelButton.addEventListener('click', onCancelButtonClick);


const renderGallery = (pictures) => {

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });
  renderSimilarPhoto(pictures);
};


export {renderGallery};
