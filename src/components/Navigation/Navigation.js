import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation(props) {
  return (
    <nav className={`navigation ${props.activeClass}`}>
      <button className="navigation__close-button" type="button" aria-label="Закрыть меню"></button>
      <Link className="navigation__item-main" to="/">Главная</Link>
      <div className="navigation__links">
        <Link className={`navigation__link ${props.linkLightClass}`} to="/movies">Фильмы</Link>
        <Link className={`navigation__link ${props.linkLightClass}`} to="/saved-movies">Сохранённые фильмы</Link>
      </div>
      <Link className={`navigation__account-button ${props.accountButtonLightClass}`} to="/profile">
        <p className="navigation__account-button-caption">Аккаунт</p>
        <div className="navigation__account-button-picture"></div>
      </Link>
    </nav>
  )
}

export default Navigation;