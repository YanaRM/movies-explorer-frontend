import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation(props) {
  return (
    <nav className={`navigation ${props.isOpen && 'navigation_active'}`}>
      <button
        className="navigation__close-button"
        type="button"
        aria-label="Закрыть меню"
        onClick={props.onClose}></button>
      <nav className="navigation__links">
        <NavLink
          to="/"
          className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>
            Главная</NavLink>
        <NavLink 
          to="/movies" 
          className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>
            Фильмы</NavLink>
        <NavLink 
          to="/saved-movies" 
          className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>
            Сохранённые фильмы</NavLink>
      </nav>
      <button className="navigation__account-button" type="button" aria-label="Аккаунт">
        <Link className="navigation__account-button-link" to="/profile">
          <p className="navigation__account-button-caption">Аккаунт</p>
          <div className="navigation__account-button-picture"></div>
        </Link>
      </button>
    </nav>
  )
}

export default Navigation;