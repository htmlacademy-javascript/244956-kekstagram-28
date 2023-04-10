import {showSuccess, showError} from './utils.js';
const getDataUrl = 'https://28.javascript.pages.academy/kekstagram/data';
const sendDataUrl = 'https://28.javascript.pages.academy/kekstagram';

const getData = () => fetch(getDataUrl)
  .then((response) => response.json());


const sendData = (body) => fetch(
  sendDataUrl,
  {
    method: 'POST',
    body,
  },
).then((response) => {
  if (!response.ok) {
    showError();
  } else {
    showSuccess();
  }
})
  .catch(() => {
    showError();
  });

export {getData, sendData};
