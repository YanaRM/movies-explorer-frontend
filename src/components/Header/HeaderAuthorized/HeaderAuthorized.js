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
      <div className={`header-authorized__account-link-container
        header-authorized__account-link-container_${props.lightMode}`}>
        <Link className="header-authorized__account-link" to="/profile">Аккаунт</Link>
        <div className="header-authorized__account-link-picture"></div>
      </div>
    </nav>
  )
}

export default HeaderAuthorized;