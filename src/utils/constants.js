// Статусы ошибок
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

// Сообщения об ошибках валидации:

const USER_EXISTS = 'Такой пользователь уже существует'; //409
const WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль'; //401
const NOT_FOUND = 'Ничего не найдено';
const SERVER_INTERNAL_ERROR = 'На сервере произошла ошибка'; //500
const PROFILE_UPDATE_ERROR = 'При обновлении профиля произошла ошибка.';
const SEARCH_INPUT_ERROR = 'Нужно ввести ключевое слово';
const SEARCH_REQUEST_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

// Длительность короткометражного фильма:
const SHORT_MOVIE_DURATION = 40;

// Константы ресайза приложения:
const SCREEN_SIZE_768 = 768;
const SCREEN_SIZE_1024 = 1024;
const SCREEN_SIZE_1280 = 1280;

const START_CARDS_SCREEN_BELOW_768 = 5;
const START_CARDS_SCREEN_BELOW_1024 = 8;
const START_CARDS_SCREEN_BELOW_1280 = 12;
const START_CARDS_SCREEN_ABOVE_1280 = 16;

const ADDED_CARDS_SCREEN_BELOW_768 = 1;
const ADDED_CARDS_SCREEN_BELOW_1024 = 2;
const ADDED_CARDS_SCREEN_BELOW_1280 = 3;
const ADDED_CARDS_SCREEN_ABOVE_1280 = 4;

// Валидация email
const EMAIL_REGULAR_EXPRESSION = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$";

export {
  CONFLICT,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  USER_EXISTS,
  WRONG_EMAIL_OR_PASSWORD,
  NOT_FOUND,
  SERVER_INTERNAL_ERROR,
  PROFILE_UPDATE_ERROR,
  SEARCH_INPUT_ERROR,
  SEARCH_REQUEST_ERROR,
  SHORT_MOVIE_DURATION,
  SCREEN_SIZE_768,
  SCREEN_SIZE_1024,
  SCREEN_SIZE_1280,
  START_CARDS_SCREEN_BELOW_768,
  START_CARDS_SCREEN_BELOW_1024,
  START_CARDS_SCREEN_BELOW_1280,
  START_CARDS_SCREEN_ABOVE_1280,
  ADDED_CARDS_SCREEN_BELOW_768,
  ADDED_CARDS_SCREEN_BELOW_1024,
  ADDED_CARDS_SCREEN_BELOW_1280,
  ADDED_CARDS_SCREEN_ABOVE_1280,
  EMAIL_REGULAR_EXPRESSION
};