import {showAlert, debounce} from './utils.js';
import {getData} from './api.js';
import {renderGallery} from './modal-bigphoto.js';
import {setUserPhotoSubmit, closeUserPhotoSubmit} from './load-picture.js';
import {init, sortPictures} from './filters.js';

getData ()
  .then((thumbnails) => {
    const debouncedRenderGallery = debounce(renderGallery);
    init (thumbnails, debouncedRenderGallery);
    renderGallery(sortPictures());
  }
  )
  .catch(() => {
    showAlert('Помогите, все сломалось');
  });

setUserPhotoSubmit(closeUserPhotoSubmit);


