import {isEscapeKey} from './modal-bigphoto.js';
import {rescale} from './resize.js';
import {resetEffects} from './effects.js';

const loadForm = document.querySelector('.img-upload__form');
const fileField = document.getElementById('upload-file');
const modalUpload = loadForm.querySelector('.img-upload__overlay');
const closeButton = document.getElementById('upload-cancel');
const hashtagsField = loadForm.querySelector('.text__hashtags');
const commentsField = loadForm.querySelector('.text__description');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const ERRORMESSAGE = 'Неправильно заполнена форма';
const MAXSYMBOLS = 140;
const MAXHASHTAGS = 5;

//OPEN
fileField.addEventListener('change', (evt) => {
  modalUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  evt.preventDefault();
  rescale();
});

//VALIDATOR
const pristine = new Pristine(loadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

// поле комментариев
function validateCommentsField (value) {
  return value.length <= MAXSYMBOLS;
}
pristine.addValidator (commentsField, validateCommentsField, ERRORMESSAGE);
//

//хэш тэги
const isValidHashtag = (tag) => hashtag.test(tag);

const isHashtagLength = (tags) => tags.length <= MAXHASHTAGS;

const isUniqueTags = (tags) => {
  const hashtagArray = tags.map((tag) => tag.toLowerCase());
  return hashtagArray.length === new Set(hashtagArray).size;
};

const validateHashtagsField = (value) => {
  const tags = value.trim().split(' ');
  return isHashtagLength(tags) && isUniqueTags(tags) && tags.every(isValidHashtag);
};

pristine.addValidator (hashtagsField, validateHashtagsField, ERRORMESSAGE);

loadForm.addEventListener ('submit', () => {
  pristine.validate();
});

// ЗАКРЫТИЕ
closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalUpload.classList.add('hidden');
  fileField.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
  pristine.reset();
  document.removeEventListener('keydown', (evt));
  rescale();
  resetEffects();
});

const imputFocus = () =>
  document.activeElement === hashtagsField || document.activeElement === commentsField;

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !imputFocus()) {
    evt.preventDefault();
    modalUpload.classList.add('hidden');
    fileField.value = '';
    hashtagsField.value = '';
    commentsField.value = '';
    pristine.reset();
    document.removeEventListener('keydown', (evt));
    rescale();
    resetEffects();
  }
});
