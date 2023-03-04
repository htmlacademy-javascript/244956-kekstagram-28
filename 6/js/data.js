import {getRandomInteger} from './random-functions.js';
import {createRandomNorepeat} from './random-functions.js';


const DESCRIPTION = [
  'Подписи к фотографиям',
  'Пансионат "Имеритинская бухта"',
  'Осталось немного',
  'Славное море, священный Байкал',
  'OMG, look at her camera!',
  'Очень харчо',
  'Бэт-мобиль',
  'Мой стэйк сегодня',
  'Кисель, как у бабушки',
  'Wait for me!!!',
  'Шведский минимализм от IKEA',
  'По газонам не ходить!',
  'Где моя тачка, чувак?',
  'Диета, день 17',
  'Кото-диета',
  'Как тебе такое, Илон Маск?',
  'Еду в Магадан',
  'Калинка-малинка',
  'Такая только у меня и у Майкла Джексона',
  'Ты - свет на моем пути',
  'Угадайте, где это?',
  'Научилась готовить поке',
  'Что это там слева плывет?',
  'Краб на галере',
  'Кто снимает, а кто поазывает треугольник',
  'Жрать давай'
];

const MESSAGES = [
  ' ',
  ' ',
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Вася Пупкин',
  'Петя Ветров',
  'user12345',
  'Вован',
  'expecto_patronum',
  'Sponge Bob',
  'panterka',
  'Sveta1989',
  'Скмеречная искорка',
  'kotja',
  'Александр Иванович',
  'Квентин Тарантино',
  'Джонни Сигара',
  'Джонни Стакан',
  'Санни Красный',
  'Санни Черный',
  'Саня просто Саня',
];

const createPost = function() { //эта функция создает объект

  const generateRandomUnique = createRandomNorepeat(1, 25);
  const photoNumber = generateRandomUnique();
  const commentIdGenerator = Math.round((Math.random(0, 1) * 10));
  const getRandomMessage = createRandomNorepeat(0, MESSAGES.length - 1);
  const getRandomName = createRandomNorepeat(0, NAMES.length - 1);
  const createAvatar = createRandomNorepeat(1, 6);

  return {
    id: generateRandomUnique(),
    // eslint-disable-next-line prefer-template
    url: 'photos/' + photoNumber + '.jpg',
    description: DESCRIPTION[photoNumber],
    likes: getRandomInteger(1, 200),
    comments: [
      {
        commentId: commentIdGenerator,
        // eslint-disable-next-line prefer-template
        avatar: 'img/avatar-' + createAvatar() + '.svg',
        // eslint-disable-next-line prefer-template
        message: MESSAGES[getRandomMessage()] + ' ' + MESSAGES[getRandomMessage()],
        name: NAMES[getRandomName()],
      },
      {
        commentId: commentIdGenerator,
        // eslint-disable-next-line prefer-template
        avatar: 'img/avatar-' + createAvatar() + '.svg',
        // eslint-disable-next-line prefer-template
        message: MESSAGES[getRandomMessage()] + ' ' + MESSAGES[getRandomMessage()],
        name: NAMES[getRandomName()],
      }
    ],
  };
};

const similarPosts = () => Array.from({length: 25}, createPost);
export {similarPosts};
