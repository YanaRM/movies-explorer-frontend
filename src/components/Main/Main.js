import React from 'react';
import './Main.css';
import Promo from './Promo/Promo.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import Portfolio from './Portfolio/Portfolio.js';

function Main(props) {
  return (
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  )
}

export default Main;