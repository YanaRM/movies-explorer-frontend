import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HeaderAuthorized.css';

function HeaderAuthorized(props) {
  return (
    <nav className="header-authorized">
      <nav className="header-authorized__links">
        <NavLink 
          to="/movies" className={({isActive}) =>
          `header-authorized__link ${isActive ? "header-authorized__link_active" : ""}
          header-authorized__link_${props.lightMode}`}>
            Фильмы</NavLink>
        <NavLink 
          to="/saved-movies" className={({isActive}) =>
          `header-authorized__link ${isActive ? "header-authorized__link_active" : ""}
          header-authorized__link_${props.lightMode}`}>
            Сохранённые фильмы</NavLink>
      </nav>
      <button
        className={`header-authorized__account-button header-authorized__account-button_${props.lightMode}`}
        type="button"
        aria-label="Аккаунт">
        <Link className="header-authorized__account-button-link" to="/profile">
          <p className="header-authorized__account-button-caption">Аккаунт</p>
          <div className="header-authorized__account-button-picture"></div>
        </Link>
      </button>
    </nav>
  )
}

export default HeaderAuthorized;