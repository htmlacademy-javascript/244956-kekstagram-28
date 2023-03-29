import './pictures.js';
import {renderGallery} from './modal-bigphoto.js';
import {setUserPhotoSubmit, closeUserPhotoSubmit} from './load-picture.js';
import './resize.js';
import './effects.js';
import {showAlert} from './utils.js';
import {getData} from './api.js';

getData ()
  .then((thumbnails) => {
    renderGallery(thumbnails);
  }
  )
  .catch(() => {
    showAlert('Помогите, все сломалось');
  });

setUserPhotoSubmit(closeUserPhotoSubmit);
