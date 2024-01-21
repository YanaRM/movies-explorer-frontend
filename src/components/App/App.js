import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
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
import HeaderAuthorized from '../Header/HeaderAuthorized/HeaderAuthorized.js';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openHeaderMenu() {
    setIsMenuOpen(true);
  }

  function closeHeaderMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="page">
      
      <Routes>

        <Route path="/" element={<Header
          children={
            <div className="header__buttons-container">
              <Link className="header__register-button" to="/signup">Регистрация</Link>
              <Link to="/signin">
                <button className="header__auth-button" type="button" aria-label="Войти">Войти</button>
              </Link>
            </div>
          } />}
        />

        <Route path="/movies" element={<Header
          lightThemeClass="header_light"
          buttonActiveClass="header__menu-button_active"
          buttonLightClass="header__menu-button_light"
          onClick={openHeaderMenu}
          children={
            <HeaderAuthorized
              lightMode="light"
            />
          }
          />}
        />

        <Route path="/saved-movies" element={<Header
          lightThemeClass="header_light"
          buttonActiveClass="header__menu-button_active"
          buttonLightClass="header__menu-button_light"
          onClick={openHeaderMenu}
          children={
            <HeaderAuthorized
              lightMode="light"
            />
          }
          />}
        />

      </Routes>

      <Routes>

        <Route path="/" element={<Main />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/saved-movies" element={<SavedMovies />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/signup" element={<Register />} />

        <Route path="signin" element={<Login />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>

      <Routes>

        <Route path="/" element={<Footer />} />

        <Route path="/movies" element={<Footer />} />

        <Route path="/saved-movies" element={<Footer />} />

      </Routes>

      <Navigation
        isOpen={isMenuOpen}
        onClose={closeHeaderMenu}/>

    </div>
  )
}

export default App;