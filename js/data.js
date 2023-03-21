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

const PHOTOSCOUNT = 25;
const COMMENTSCOUNT = 2;


const createPost = function () {
  const generateRandomUnique = createRandomNorepeat(1, 25);
  const photoNumber = generateRandomUnique();

  return {
    id: generateRandomUnique(),
    url: `photos/${ photoNumber }.jpg`,
    description: DESCRIPTION[photoNumber],
    likes: getRandomInteger(1, 200),

  };
};

const createComments = function () {
  const commentIdGenerator = Math.round((Math.random() * 10));
  const createAvatar = createRandomNorepeat(1, 6);
  const getRandomMessage = createRandomNorepeat(0, MESSAGES.length - 1);
  const getRandomName = createRandomNorepeat(0, NAMES.length - 1);
  return {
    commentId: commentIdGenerator,
    avatar: `img/avatar-${ createAvatar() }.svg`,
    message: MESSAGES[getRandomMessage()],
    name: NAMES[getRandomName()],
  };
};

const similarPosts = () => Array.from({length: PHOTOSCOUNT}, createPost);
const similarComments = () => Array.from({length: 25}, createComments);

export {similarPosts, similarComments,
  COMMENTSCOUNT,
  PHOTOSCOUNT,
};
