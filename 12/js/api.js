import {showSuccess, showError} from './utils.js';

const getData = () => fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json());


const sendData = (body) => fetch(
  'https://28.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  },
).then((response) => {
  if (!response.ok) {
    throw new Error(showError());
  } else {
    showSuccess();
  }
})
  .catch(() => {
    throw new Error();
  });

export {getData, sendData};
