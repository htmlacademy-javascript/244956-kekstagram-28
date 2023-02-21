let string = '';

// - Функция для проверки длины строки
const checkLength = function (string, length) {
  return ((string.length) <= length);
};

// - Функция для проверки, является ли строка палиндромом.
const checkPalyndrome = (string) => {
  const tempString = string.toLowerCase().replaceAll(' ', '');
  let reverse = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverse += tempString.at(i);
  }
  return tempString === reverse;
};

// - Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//  и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры,
//  функция должна вернуть NaN

const findNumbers = function (string) {
  if(typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if(isNaN(parseInt(string.at(i), 10)) === false) {
      result += parseInt(string.at(i));
    }
  }
  return parseInt(result, 10);
};

//  - Функция, которая принимает три параметра:
//   исходную строку, минимальную длину и строку с добавочными символами
//    — и возвращает исходную строку, дополненную указанными символами до заданной длины.
//    Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
//    она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца

let stringStart = '';//исходная сртока
let stringLength;//длина строки
let stringAdd = '';//добавочные символы

const createString = function (stringStart, stringLength, stringAdd) {

  let newString = '';
  let allowedLength = (stringLength - stringStart.length);

  if (allowedLength <= 0) {
    return string;
  }

  return stringAdd.slice(0, allowedLength % stringAdd.length) + stringAdd.repeat(allowedLength / stringAdd.length) + stringStart
}


