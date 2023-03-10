
import {similarPosts} from './data.js';

const lastElement = document.querySelector('.img-upload');
const userPicsContainer = document.createElement('section'); //блок для фотографий пользователей
userPicsContainer.classList.add('img-users');
lastElement.appendChild(userPicsContainer);

const template = document.querySelector('#picture').content.querySelector('.picture'); // Находим фрагмент с содержимым темплейта

const fragment = document.createDocumentFragment();

const userPhotos = similarPosts(); //импорт массива фотографий

userPhotos.forEach ((element) => {
  const newPost = template.cloneNode(true);

  newPost.querySelector('.picture__img').src = element.url;
  newPost.querySelector('.picture__comments').textContent = element.comments.length;
  newPost.querySelector('.picture__likes').textContent = element.likes;

  fragment.appendChild(newPost);
});

userPicsContainer.appendChild(fragment);

export {userPicsContainer};


