import React from 'react';
import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__info-container">
          <h3 className="about-project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__info-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info-container">
          <h3 className="about-project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__info-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__chart">
        <div className="about-project__chart-container about-project__chart-container-backend">
          <p className="about-project__chart-segment about-project__chart-segment-backend">1 неделя</p>
          <p className="about-project__chart-caption">Back-end</p>
        </div>
        <div className="about-project__chart-container about-project__chart-container-frontend">
          <p className="about-project__chart-segment about-project__chart-segment-frontend">4 недели</p>
          <p className="about-project__chart-caption">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;