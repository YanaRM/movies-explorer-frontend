import React from 'react';
import logoPicture from '../../images/logo-picture.svg';
import './Header.css';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className={`header ${props.lightThemeClass}`} >
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logoPicture} alt="Логотип" />
      </Link>
      <div className="header__menu">
        {props.children}
      </div>
      <div className={`header__menu-button ${props.buttonActiveClass} ${props.buttonLightClass}`}></div>
    </header>
  )
}

export default Header;