import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [isSavedMovieFound, setIsSavedMovieFound] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesCheckbox, setMoviesCheckbox] = useState(
    JSON.parse(localStorage.getItem('moviesCheckbox'))
  )
  const [savedMoviesCheckbox, setSavedMoviesCheckbox] = useState(
    JSON.parse(localStorage.getItem('savedMoviesCheckbox'))
  );
  const [moviesInputValue, setMoviesInputValue] = useState('');
  const [savedMoviesInputValue, setsavedMoviesInputValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err))
    }
  }, [loggedIn])

  useEffect(() => {
    setIsLoading(true);

    moviesApi.getMovies()
      .then((data) => {
        setMovies(data);
        console.log(data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
    
    mainApi.getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    tokenCheck();
  }, [])

  function openHeaderMenu() {
    setIsMenuOpen(true);
  }

  function closeHeaderMenu() {
    setIsMenuOpen(false);
  }

  function handleRegister(data) {
    mainApi.createNewUser(data)
      .then(() => {
        navigate('/signin', { replace: true });
      })
      .catch(err => console.log(err))
  }

  function handleLogin(data) {
    mainApi.login(data)
      .then(() => {
        setLoggedIn(true);
        tokenCheck();

        navigate('/movies', { replace: true });
      })
      .catch(err => console.log(err))
  }

  function tokenCheck() {
    mainApi.checkToken()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(err => console.log(err))
  }

  function signOut() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);

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

  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const updatedSavedMoviesArray = savedMovies.filter(i => i._id !== movie._id);
        setSavedMovies(updatedSavedMoviesArray);
      })
      .catch(err => console.log(err))
  }
  function handleSearchMovie(data) {
    setFilteredMovies(
      movies.filter((i) => {
      return i.nameRU.toLowerCase().includes(data.toLowerCase());
      })
    )

    if (filteredMovies.length !== 0) {
      setIsMovieFound(true);
    } else {
      setIsMovieFound(false);
    }
  }

  function handleSearchSavedMovie(data) {
    setFilteredSavedMovies(
      savedMovies.filter((i) => {
        return i.nameRU.toLowerCase().includes(data.toLowerCase());
      })
    )
    
    if (filteredSavedMovies.length !== 0) {
      setIsSavedMovieFound(true);
    } else {
      setIsSavedMovieFound(false);
    }
  }

  function handleToggleMovieCheckbox(checked) {
    if (checked) {
      setFilteredMovies(
        movies.filter((i) => i.duration <= 40)
      )
    }
    if (checked) {
      setFilteredMovies(
        filteredMovies.filter((i) => i.duration <= 40)
      )
    }
  }

  function handleToggleSavedMovieCheckbox(checked) {
    if (checked) {
      setFilteredSavedMovies(
        savedMovies.filter((i) => i.duration <= 40)
      )
    }
    if (checked) {
      setFilteredSavedMovies(
        filteredSavedMovies.filter((i) => i.duration <= 40)
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

          <Route path="/" element={<Main />} />

          <Route path="/movies" element={<ProtectedRouteElement element={Movies}
            loggedIn={loggedIn}
            movies={movies}
            savedMovies={savedMovies}
            handleLikeClick={handleSaveMovie}
            handleSearchMovie={handleSearchMovie}
            filteredMovies={filteredMovies}
            isMovieFound={isMovieFound}
            isLoading={isLoading}
            handleToggleMovieCheckbox={handleToggleMovieCheckbox}
            />}
          />

          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
            handleSearchSavedMovie={handleSearchSavedMovie}
            filteredSavedMovies={filteredSavedMovies}
            isSavedMovieFound={isSavedMovieFound}
            handleToggleSavedMovieCheckbox={handleToggleSavedMovieCheckbox}
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

          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />

          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

        <Routes>

          <Route path="/" element={<Footer />} />

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