import React from 'react';
import logoPicture from '../../images/logo-picture.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import HeaderAuthorized from './HeaderAuthorized/HeaderAuthorized.js';

function Header(props) {
  return (
    <header className={`header ${props.lightThemeClass}`} >
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logoPicture} alt="Логотип" />
      </Link>
      <div className="header__menu">

        { props.loggedIn ? (
          <HeaderAuthorized lightMode={props.lightMode} />
        ) : (
          <div className="header__links-container">
            <Link className="header__register-link" to="/signup">Регистрация</Link>
            <Link to="/signin" className="header__auth-link">Войти</Link>
          </div>
        )}

      </div>
      <button
        className={`header__menu-button ${props.loggedIn ? props.buttonActiveClass : ""} ${props.buttonLightClass}`}
        type="button"
        aria-label="Кнопка меню"
        onClick={props.onClick}></button>
    </header> 
  )
}

export default Header;