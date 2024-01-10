import React from 'react';
import logoPicture from '../../images/logo-picture.svg';
import './Header.css';

function Header(props) {
  return (
    <header className="header" >
      <img className="header__logo" src={logoPicture} alt="Логотип" />
      <div className="header__menu">
        {/* {props.children} */}
      </div>
      <div className="header__menu-button"></div>
    </header>
  )
}

export default Header;