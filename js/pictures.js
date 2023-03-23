
import {similarPosts} from './data.js';
import {similarComments} from './data.js';
import {createRandomNorepeat} from './random-functions.js';

const parent = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture'); // Находим фрагмент с содержимым темплейта

const userPhotos = similarPosts(); //импорт массива фотографий
const userComments = similarComments(); // импорт массива комментариев
const fragment = document.createDocumentFragment();
const maxComments = createRandomNorepeat(5, 30);

userPhotos.forEach ((element) => {

  const newPost = template.cloneNode(true);

  newPost.querySelector('.picture__img').src = element.url;
  newPost.querySelector('.picture__img').alt = element.description;
  newPost.querySelector('.picture__comments').textContent = maxComments();
  newPost.querySelector('.picture__likes').textContent = element.likes;

  fragment.appendChild(newPost);

});

parent.appendChild(fragment);

export {parent, userPhotos, userComments};

