import React from 'react';

function Navigation(props) {
  return (
    <nav className="navigation">
      <p className="navigation__item navigation__item_main"></p>
      <p className="navigation__item"></p>
      <p className="navigation__item"></p>
      <div className="navigation__item navigation__item_account">
        <p className="navigation__account-caption"></p>
        <div className="navigation__account-picture"></div>
      </div>
    </nav>
  )
}

export default Navigation;