const PICTURESCOUNT = 10;

const filter = {
  default : 'filter-default',
  random : 'filter-random',
  discussed: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters__form');
let currentFilter = filter.default;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const sortPictures = () => {
  switch (currentFilter) {
    case filter.random:
      return [...pictures].sort(sortRandomly).slice(0, PICTURESCOUNT);
    case filter.discussed:
      return [...pictures].sort(sortByComments);
    case filter.default:
      return[...pictures];
  }
};

const setFilter = (callback) => {
  filterElement.addEventListener('click', (evt) => {

    const activeButton = evt.target;

    if (activeButton.id === currentFilter) {
      return;
    }
    const activeElement = document.querySelector('.img-filters__button--active');
    activeElement.classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
    currentFilter = activeButton.id;
    callback(sortPictures());
  });
};

const initiate = (loadedPictures, callback) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setFilter(callback);
};

export {initiate, sortPictures};
