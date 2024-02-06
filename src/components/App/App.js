import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Footer from '../Footer/Footer.js';
import Navigation from '../Navigation/Navigation.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import auth from '../../utils/Auth.js';
import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import {
  CONFLICT,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  SHORT_MOVIE_DURATION,
  USER_EXISTS,
  WRONG_EMAIL_OR_PASSWORD,
  NOT_FOUND,
  SERVER_INTERNAL_ERROR,
  PROFILE_UPDATE_ERROR,
  SEARCH_REQUEST_ERROR
} from '../../utils/constants.js';

function App() {
  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  const [loggedIn, setLoggedIn] = useState(loggedInFromStorage);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem('checkbox')));
  const [isCheckedSaved, setIsCheckedSaved] = useState(false);
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [isSavedMovieFound, setIsSavedMovieFound] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [updateUserErrorMessage, setUpdateUserErrorMessage] = useState('');
  const [moviesErrorMessage, setMoviesErrorMessage] = useState('');
  const [savedMoviesErrorMessage, setSavedMoviesErrorMessage] = useState('');
  const [searchMovieErrorMessage, setSearchMovieErrorMessage] = useState('');
  const [searchSavedMovieErrorMessage, setSearchSavedMovieErrorMessage] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch(err => console.log(err))
    
      mainApi.getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          if (err === INTERNAL_SERVER_ERROR) {
            setSearchSavedMovieErrorMessage(SEARCH_REQUEST_ERROR);
          }

          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('allMovies'))) {
      if (localStorage.getItem('allMovies'))
      setMovies(JSON.parse(localStorage.getItem('allMovies')));
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }
  }, []);

  function openHeaderMenu() {
    setIsMenuOpen(true);
  }

  function closeHeaderMenu() {
    setIsMenuOpen(false);
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleRegister({ name, email, password }) {
    setIsInputDisabled(true);
    auth.createNewUser({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
      })
      .catch((err) => {
        if (err === CONFLICT) {
          setRegisterErrorMessage(USER_EXISTS);
        } else if (err === INTERNAL_SERVER_ERROR) {
          setRegisterErrorMessage(SERVER_INTERNAL_ERROR);
        }

        setIsInputDisabled(false);
        console.log(err);
      })
  }

  function handleLogin({ email, password }) {
    setIsInputDisabled(true);
    auth.login({ email, password })
      .then(() => {
        localStorage.setItem('loggedIn', JSON.stringify(true));
        setLoggedIn(true);
        tokenCheck();

        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        if (err === UNAUTHORIZED) {
          setLoginErrorMessage(WRONG_EMAIL_OR_PASSWORD);
        } else if (err === INTERNAL_SERVER_ERROR) {
          setLoginErrorMessage(SERVER_INTERNAL_ERROR);
        }

        setIsInputDisabled(false);
        console.log(err);
      })
      .finally(() => {
        setIsInputDisabled(false);
      })
  }

  function tokenCheck() {
    auth.checkToken()
      .then(() => {
        localStorage.setItem('loggedIn', JSON.stringify(true));
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', JSON.stringify(false));
        console.log(err)
      })
  }

  function signOut() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', JSON.stringify(false));
        localStorage.clear();
        setMovies([]);
        setFilteredMovies([]);
        setSavedMovies([]);
        setFilteredSavedMovies([]);

        navigate('/', { replace: true });
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    mainApi.updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        if (err === CONFLICT) {
          setUpdateUserErrorMessage(USER_EXISTS);
        } else if (err === INTERNAL_SERVER_ERROR) {
          setUpdateUserErrorMessage(PROFILE_UPDATE_ERROR);
        }
        console.log(err);
      })
  }

  function handleSaveMovie(data) {
    mainApi.createMovie(data)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        if (filteredSavedMovies.length === 0) {
          const updatedSavedMoviesArray = savedMovies.filter(i => i._id !== movieId);
          setSavedMovies(updatedSavedMoviesArray);
        } else {
          const updatedFilteredSavedMoviesArray = filteredSavedMovies.filter(i => i._id !== movieId);
          setSavedMovies(updatedFilteredSavedMoviesArray);
          setFilteredSavedMovies(updatedFilteredSavedMoviesArray);
        }
      })
      .catch(err => console.log(err))
  }

  function handleSearchMovie(inputData) {
    if (movies.length !== 0) {
      const foundMovies =
        movies.filter((i) => {
        return i.nameRU.toLowerCase().includes(inputData.toLowerCase());
        });

      if (isChecked) {
        const shortMovies = foundMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION);
        setFilteredMovies(shortMovies);
        localStorage.setItem('filteredMovies', JSON.stringify(shortMovies));
        localStorage.setItem('inputData', inputData);
        localStorage.setItem('checkbox', JSON.stringify(isChecked));
        if (shortMovies.length === 0) {
          setIsMovieFound(false);
          setMoviesErrorMessage(NOT_FOUND);
        } else {
          setIsMovieFound(true);
        }
      } else {
        setFilteredMovies(foundMovies);
        localStorage.setItem('filteredMovies', JSON.stringify(foundMovies));
        localStorage.setItem('inputData', inputData);
        localStorage.setItem('checkbox', JSON.stringify(isChecked));
        if (foundMovies.length === 0) {
          setIsMovieFound(false);
          setMoviesErrorMessage(NOT_FOUND);
        } else {
          setIsMovieFound(true);
        }
      }

    } else {
      setIsLoading(true);

      moviesApi.getMovies()
        .then((data) => {
          const foundMovies =
            data.filter((i) => {
            return i.nameRU.toLowerCase().includes(inputData.toLowerCase());
            });

          if (isChecked) {
            const shortMovies = foundMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION);
            setFilteredMovies(shortMovies);
            localStorage.setItem('filteredMovies', JSON.stringify(shortMovies));
            localStorage.setItem('inputData', inputData);
            localStorage.setItem('checkbox', JSON.stringify(isChecked));
            if (shortMovies.length === 0) {
              setIsMovieFound(false);
              setMoviesErrorMessage(NOT_FOUND);
            } else {
              setIsMovieFound(true);
            }
          } else {
            setFilteredMovies(foundMovies);
            localStorage.setItem('filteredMovies', JSON.stringify(foundMovies));
            localStorage.setItem('inputData', inputData);
            localStorage.setItem('checkbox', JSON.stringify(isChecked));
            if (foundMovies.length === 0) {
              setIsMovieFound(false);
              setMoviesErrorMessage(NOT_FOUND);
            } else {
              setIsMovieFound(true);
            }
          }

          console.log(data);
        })
        .catch((err) => {
          if (err === INTERNAL_SERVER_ERROR) {
            setSearchMovieErrorMessage(SEARCH_REQUEST_ERROR);
          }

          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  function handleSearchSavedMovie(inputData) {
    const foundMovies =
      savedMovies.filter((i) => {
      return i.nameRU.toLowerCase().includes(inputData.toLowerCase());
    });
    const shortMovies = foundMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION);

    if (isCheckedSaved) {
      setFilteredSavedMovies(shortMovies);
      
      if (shortMovies.length === 0) {
        setIsSavedMovieFound(false);
        setSavedMoviesErrorMessage(NOT_FOUND);
      } else {
        setIsSavedMovieFound(true);
        setSavedMoviesErrorMessage('');
      }
    } else {
      setFilteredSavedMovies(foundMovies);

      if (foundMovies.length === 0) {
        setIsSavedMovieFound(false);
        setSavedMoviesErrorMessage(NOT_FOUND);
      } else {
        setIsSavedMovieFound(true);
        setSavedMoviesErrorMessage('');
      }
    }
  }

  function handleToggleMovieCheckbox() {
    setIsChecked(!isChecked);

    let shortMovies;

    let filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    
    if (filteredMovies.length === 0) {
      return [];
    }

    if (!isChecked) {
      shortMovies = filteredMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION);
      setFilteredMovies(shortMovies);
      localStorage.setItem('filteredMovies', JSON.stringify(shortMovies));
    } else if (isChecked) {
      shortMovies = filteredMovies;
      setFilteredMovies(shortMovies);
      localStorage.setItem('filteredMovies', JSON.stringify(shortMovies));
    }

    localStorage.setItem('checkbox', JSON.stringify(!isChecked));
  }

  function handleToggleSavedMovieCheckbox() {
    setIsCheckedSaved(!isCheckedSaved);

    if (!isCheckedSaved) {
      setFilteredSavedMovies(savedMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION));
    } else if (isCheckedSaved) {
      return savedMovies;
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>

          <Route path="/" element={<Header
            loggedIn={loggedIn}
            buttonActiveClass="header__menu-button_active"
            onClick={openHeaderMenu}
            />}
          />

          <Route path="/movies" element={<ProtectedRouteElement element={Header}
            loggedIn={loggedIn}
            lightThemeClass="header_light"
            buttonActiveClass="header__menu-button_active"
            buttonLightClass="header__menu-button_light"
            onClick={openHeaderMenu}
            lightMode="light"
            />}
          />

          <Route path="/saved-movies" element={<ProtectedRouteElement element={Header}
            loggedIn={loggedIn}
            lightThemeClass="header_light"
            buttonActiveClass="header__menu-button_active"
            buttonLightClass="header__menu-button_light"
            onClick={openHeaderMenu}
            lightMode="light"
            />}
          />

        </Routes>

        <Routes>

          <Route path="/" element={<Main />} loggedIn={loggedIn} />

          <Route path="/movies" element={<ProtectedRouteElement element={Movies}
            loggedIn={loggedIn}
            isChecked={isChecked}
            movies={movies}
            savedMovies={savedMovies}
            handleLikeClick={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            handleSearchMovie={handleSearchMovie}
            filteredMovies={filteredMovies}
            isMovieFound={isMovieFound}
            isLoading={isLoading}
            handleToggleMovieCheckbox={handleToggleMovieCheckbox}
            moviesErrorMessage={moviesErrorMessage}
            searchMovieErrorMessage={searchMovieErrorMessage}
            />}
          />

          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggedIn={loggedIn}
            isChecked={isCheckedSaved}
            isLoading={isLoading}
            savedMovies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
            handleSearchSavedMovie={handleSearchSavedMovie}
            filteredSavedMovies={filteredSavedMovies}
            isSavedMovieFound={isSavedMovieFound}
            handleToggleSavedMovieCheckbox={handleToggleSavedMovieCheckbox}
            savedMoviesErrorMessage={savedMoviesErrorMessage}
            searchSavedMovieErrorMessage={searchSavedMovieErrorMessage}
            />}
          />

          <Route path="/profile"
            element={<ProtectedRouteElement element={Profile}
              loggedIn={loggedIn}
              name={currentUser.name}
              signOut={signOut}
              onUpdateUser={handleUpdateUser}
              updateUserErrorMessage={updateUserErrorMessage}
            />}
          />

          <Route path="/signup" element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Register
                handleRegister={handleRegister}
                loggedIn={loggedIn}
                registerErrorMessage={registerErrorMessage}
                isInputDisabled={isInputDisabled} />
            )}
          />

          <Route path="/signin" element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Login
                handleLogin={handleLogin}
                loggedIn={loggedIn}
                loginErrorMessage={loginErrorMessage}
                isInputDisabled={isInputDisabled} />
            )}
          />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

        <Routes>

          <Route path="/" element={<Footer />} loggedIn={loggedIn} />

          <Route path="/movies" element={<ProtectedRouteElement element={Footer}
            loggedIn={loggedIn}
            />}
          />

          <Route path="/saved-movies" element={<ProtectedRouteElement element={Footer}
            loggedIn={loggedIn}
            />}
          />

        </Routes>

        <Navigation
          loggedIn={loggedIn}
          isOpen={isMenuOpen}
          onClose={closeHeaderMenu}
        />

        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;