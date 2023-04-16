import {rescale} from './resize.js';
import {resetEffects} from './effects.js';
import {showError, isEscapeKey} from './utils.js';
import {sendData} from './api.js';

const SYMBOLS_MAX = 140;
const HASHTAGS_MAX = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const loadForm = document.querySelector('.img-upload__form');
const fileField = document.getElementById('upload-file');
const modalUpload = loadForm.querySelector('.img-upload__overlay');
const closeButton = document.getElementById('upload-cancel');
const hashtagsField = loadForm.querySelector('.text__hashtags');
const commentsField = loadForm.querySelector('.text__description');

const hashtagRequirements = /^#[a-zа-яё0-9]{1,19}$/i;
const ALERT_TEXT = 'Неправильно заполнена форма';
const errorMessage = document.querySelector('.error');

fileField.addEventListener('change', (evt) => {
  modalUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  evt.preventDefault();

  const file = fileField.files[0];
  const fileName = file.name.toLowerCase();
  const preview = modalUpload.querySelector('img');

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }

  rescale();
});

const pristine = new Pristine (loadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateCommentsField (value) {
  return value.length <= SYMBOLS_MAX;
}

pristine.addValidator (commentsField, validateCommentsField, ALERT_TEXT);

const isValidHashtag = (tag) => hashtagRequirements.test(tag);

const isHashtagLength = (tags) => tags.length <= HASHTAGS_MAX;

const isUniqueTags = (tags) => {
  const hashtagArray = tags.map((tag) => tag.toLowerCase());
  return hashtagArray.length === new Set(hashtagArray).size;
};

const validateHashtagsField = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return isHashtagLength(tags) && isUniqueTags(tags) && tags.every(isValidHashtag);
};

pristine.addValidator (hashtagsField, validateHashtagsField, ALERT_TEXT);


const setUserPhotoSubmit = (onSuccess) => {
  loadForm.addEventListener ('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => showError());
    }
  });
};

const closeUserPhotoSubmit = () => {
  modalUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileField.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
  pristine.reset();
  rescale();
  resetEffects();
};

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUserPhotoSubmit();
  document.removeEventListener('keydown', (evt));
});

const focusInput = () =>
  document.activeElement === hashtagsField || document.activeElement === commentsField;

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !focusInput() && !errorMessage) {
    evt.preventDefault();
    closeUserPhotoSubmit();
    document.removeEventListener('keydown', (evt));
  }
});

export {setUserPhotoSubmit, closeUserPhotoSubmit};
