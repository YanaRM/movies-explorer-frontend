import React from 'react';
import './Promo.css';

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__info-container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__button" href="#about-project">
          Узнать больше
        </a>
      </div>
      <div className="promo__picture"></div>
    </section>
  )
}

export default Promo;