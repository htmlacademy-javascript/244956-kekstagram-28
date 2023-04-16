import {showSuccess} from './utils.js';
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
)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    } else {
      showSuccess();
    }
  });


export {getData, sendData};
