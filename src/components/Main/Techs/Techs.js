import React from 'react';
import './Techs.css';

function Techs(props) {
  return (
    <section className="techs">
      <h2 className="techs__title">
        Технологии
      </h2>
      <div className="techs__info">
        <h3 className="techs__info-title">
          7 технологий
        </h3>
        <p className="techs__info-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <div className="techs__icons-container">
        <div className="techs__icon">
          <p className="techs__icon-caption">HTML</p>
        </div>
        <div className="techs__icon">
          <p className="techs__icon-caption">CSS</p>
        </div>
        <div className="techs__icon">
          <p className="techs__icon-caption">JS</p>
        </div>
        <div className="techs__icon">
          <p className="techs__icon-caption">React</p>
        </div>
        <div className="techs__icon">
          <p className="techs__icon-caption">Git</p>
        </div>
        <div className="techs__icon">
          <p className="techs__icon-caption">Express.js</p>
        </div>
        <div className="techs__icon">
          <p className="techs__icon-caption">mongoDB</p>
        </div>
      </div>
    </section>
  )
}

export default Techs;