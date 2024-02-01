// Сообщения об ошибках валидации:

const ERROR_MESSAGE = {
  USER_EXISTS: 'Такой пользователь уже существует',

  INCORRECT_DATA: 'Неправильно введены данные',

  WRONG_EMAIL_OR_PASSWORD: 'Неправильные почта или пароль',

  SERVER_INTERNAL_ERROR: 'На сервере произошла ошибка',

  SEARCH_INPUT_ERROR: 'Нужно ввести ключевое слово',

  SEARCH_REQUEST_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
}

// Длительность короткометражного фильма:
const SHORT_MOVIE_DURATION = 40;

// Константы ресайза приложения:
const SCREEN_SIZE_768 = 768;
const SCREEN_SIZE_1024 = 1024;

const START_CARDS_SCREEN_BELOW_768 = 5;
const START_CARDS_SCREEN_BELOW_1024 = 8;
const START_CARDS_SCREEN_ABOVE_1280 = 16;

const ADDED_CARDS_SCREEN_BELOW_768 = 1;
const ADDED_CARDS_SCREEN_BELOW_1024 = 2;
const ADDED_CARDS_SCREEN_ABOVE_1280 = 4;

export {
  ERROR_MESSAGE,
  SHORT_MOVIE_DURATION,
  SCREEN_SIZE_768,
  SCREEN_SIZE_1024,
  START_CARDS_SCREEN_BELOW_768,
  START_CARDS_SCREEN_BELOW_1024,
  START_CARDS_SCREEN_ABOVE_1280,
  ADDED_CARDS_SCREEN_BELOW_768,
  ADDED_CARDS_SCREEN_BELOW_1024,
  ADDED_CARDS_SCREEN_ABOVE_1280
};