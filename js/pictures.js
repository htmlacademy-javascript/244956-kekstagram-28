
import {similarPosts} from './data.js';
import {NUMBEROFCOMMENTS} from './data.js';
const parent = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture'); // Находим фрагмент с содержимым темплейта

const userPhotos = similarPosts(); //импорт массива фотографий

const fragment = document.createDocumentFragment();

userPhotos.forEach ((element) => {

  const newPost = template.cloneNode(true);

  newPost.querySelector('.picture__img').src = element.url;
  newPost.querySelector('.picture__img').alt = element.description;
  newPost.querySelector('.picture__comments').textContent = NUMBEROFCOMMENTS;
  newPost.querySelector('.picture__likes').textContent = element.likes;

  fragment.appendChild(newPost);

});

parent.appendChild(fragment);

export {parent};
export {userPhotos};
