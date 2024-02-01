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
import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [isSavedMovieFound, setIsSavedMovieFound] = useState(false);
  const [isSavedMoviesNotEmpty, setIsSavedMoviesNotEmpty] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editProfileError, setEditProfileError] = useState('');
  const [moviesErrorMessage, setMoviesErrorMessage] = useState('');
  const [savedMoviesErrorMessage, setSavedMoviesErrorMessage] = useState('');

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
          setIsSavedMoviesNotEmpty(true);
        })
        .catch(err => console.log(err))
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
    if (JSON.parse(localStorage.getItem('filteredMovies')) && JSON.parse(localStorage.getItem('checkbox'))) {
      const checkbox = JSON.parse(localStorage.getItem('checkbox'));
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')))
      handleToggleMovieCheckbox(checkbox);
    }
  }, [])

  function openHeaderMenu() {
    setIsMenuOpen(true);
  }

  function closeHeaderMenu() {
    setIsMenuOpen(false);
  }

  function handleRegister({ name, email, password }) {
    auth.createNewUser({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
      })
      .catch(err => console.log(err))
  }

  function handleLogin({ email, password }) {
    auth.login({ email, password })
      .then(() => {
        setLoggedIn(true);
        tokenCheck();

        navigate('/movies', { replace: true });
      })
      .catch(err => console.log(err))
  }

  function tokenCheck() {
    auth.checkToken()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(err => console.log(err))
  }

  function signOut() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
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
      })
      .catch(err => console.log(err))
  }

  function handleSaveMovie(data) {
    mainApi.createMovie(data)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(err => console.log(err))
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        const updatedSavedMoviesArray = savedMovies.filter(i => i._id !== movieId);
        setSavedMovies(updatedSavedMoviesArray);
      })
      .catch(err => console.log(err))
  }

  function handleSearchMovie(inputData, checkbox) {
    if (movies.length !== 0) {
      const foundMovies =
        movies.filter((i) => {
        return i.nameRU.toLowerCase().includes(inputData.toLowerCase());
        });
      
      const shortMovies = foundMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION);
      
      setIsMovieFound(true);
      setMoviesErrorMessage('');

      if (foundMovies.length === 0) {
        setIsMovieFound(false);
        setMoviesErrorMessage('Ничего не найдено');

      } else {
        if (!checkbox) {
          setFilteredMovies(foundMovies);
          localStorage.setItem('filteredMovies', JSON.stringify(foundMovies));
          localStorage.setItem('inputData', inputData);
          localStorage.setItem('checkbox', JSON.stringify(checkbox));
        } else {
          setFilteredMovies(shortMovies);
          localStorage.setItem('filteredMovies', JSON.stringify(shortMovies));
          localStorage.setItem('inputData', inputData);
          localStorage.setItem('checkbox', JSON.stringify(checkbox));
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

          const shortMovies = foundMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION);
          
          setIsMovieFound(true);
          setMoviesErrorMessage('');

          if (foundMovies.length === 0) {
            setIsMovieFound(false);
            setMoviesErrorMessage('Ничего не найдено');
          } else {
            if (!checkbox) {
              setFilteredMovies(foundMovies);
              localStorage.setItem('allMovies', JSON.stringify(data));
              localStorage.setItem('filteredMovies', JSON.stringify(foundMovies));
              localStorage.setItem('inputData', inputData);
              localStorage.setItem('checkbox', JSON.stringify(checkbox));
            } else {
              setFilteredMovies(shortMovies);
              localStorage.setItem('filteredMovies', JSON.stringify(shortMovies));
              localStorage.setItem('inputData', inputData);
              localStorage.setItem('checkbox', JSON.stringify(checkbox));
            }
          }

          console.log(data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  function handleSearchSavedMovie(data) {
    if (savedMovies.length !== 0) {
      const foundMovies =
        savedMovies.filter((i) => {
        return i.nameRU.toLowerCase().includes(data.toLowerCase());
        });

      setIsSavedMovieFound(true);
      setIsSavedMoviesNotEmpty(true);
      setSavedMoviesErrorMessage('');
      
      if (foundMovies.length === 0) {
        setIsSavedMovieFound(false);
        setIsSavedMoviesNotEmpty(false);
        setSavedMoviesErrorMessage('Ничего не найдено');
      } else {
        setFilteredSavedMovies(foundMovies);
      }
    }
  }

  function handleToggleMovieCheckbox(checked) {
    if (checked) {
      setFilteredMovies(filteredMovies.filter((i) => i.duration <= 40));
    }
    
    if (!checked) {
      return filteredMovies;
    }

    localStorage.setItem('checkbox', JSON.stringify(checked));
  }

  function handleToggleSavedMovieCheckbox(checked) {
    if (checked) {
      setFilteredSavedMovies(
        savedMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION)
      )
    }
    if (checked) {
      setFilteredSavedMovies(
        filteredSavedMovies.filter((i) => i.duration <= SHORT_MOVIE_DURATION)
      )
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
            />}
          />

          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            savedMovies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
            handleSearchSavedMovie={handleSearchSavedMovie}
            filteredSavedMovies={filteredSavedMovies}
            isSavedMovieFound={isSavedMovieFound}
            isSavedMoviesNotEmpty={isSavedMoviesNotEmpty}
            handleToggleSavedMovieCheckbox={handleToggleSavedMovieCheckbox}
            savedMoviesErrorMessage={savedMoviesErrorMessage}
            />}
          />

          <Route path="/profile"
            element={<ProtectedRouteElement element={Profile}
              loggedIn={loggedIn}
              name={currentUser.name}
              signOut={signOut}
              onUpdateUser={handleUpdateUser}
            />}
          />

          <Route path="/signup" element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Register handleRegister={handleRegister} loggedIn={loggedIn} />
            )}
          />

          <Route path="/signin" element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Login handleLogin={handleLogin} loggedIn={loggedIn} />
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

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;