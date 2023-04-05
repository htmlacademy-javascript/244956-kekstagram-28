const parent = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderSimilarPhoto = (photo) => {

  document.querySelectorAll('.picture').forEach((element) => element.remove());

  photo.forEach ((element) => {

    const newPost = template.cloneNode(true);

    newPost.querySelector('.picture__img').src = element.url;
    newPost.querySelector('.picture__img').alt = element.description;
    newPost.querySelector('.picture__comments').textContent = element.comments.length;
    newPost.querySelector('.picture__likes').textContent = element.likes;
    newPost.dataset.thumbnailId = element.id;

    fragment.appendChild(newPost);
  });

  parent.appendChild(fragment);
};

export {renderSimilarPhoto};

