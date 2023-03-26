const smallerButton = document.querySelector('.scale__control--smaller');
const bigerButton = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const loadedImage = document.querySelector('.img-upload__preview');

const STEP = 25;
const MINVALUE = 25;
const MAXVALUE = 100;
const DEFAULTVALUE = 100;

const scaleImage = (value) => {
  scaleControlInput.value = `${value }%`;
  loadedImage.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonclick = () => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  let newValue = currentValue - STEP;
  if (newValue < MINVALUE) {
    newValue = MINVALUE;
  }
  scaleImage(newValue);
};

const onBiggerButtonclick = () => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  let newValue = currentValue + STEP;
  if (newValue > MAXVALUE) {
    newValue = MAXVALUE;
  }
  scaleImage(newValue);
};

smallerButton.addEventListener('click', onSmallerButtonclick);
bigerButton.addEventListener('click', onBiggerButtonclick);

const rescale = () => scaleImage(DEFAULTVALUE);

export {rescale, loadedImage};
